import "./edit.css";

import { useState } from "react";

// Context
import { useUiContext } from "../../context/uiContext";
import { useUserContext } from "../../context/userContext";

// Component
import { Edit, Refresh } from "../../component/icons/icons";

const EditProfile = () => {
  const { showAlert } = useUiContext();
  const { getUserFromLocalStorage } = useUserContext();
  const [values, setValues] = useState({
    name: getUserFromLocalStorage().user.name,
    email: getUserFromLocalStorage().user.email,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleUserImage = async (e) => {
    try {
      setIsEditing(true);
      const formData = new FormData();
      let imageFile = e.target.files[0];
      if (!imageFile.type.startsWith("image")) {
        setIsEditing("false");
        showAlert(true, "danger", "Please provide only image");
        return;
      }
      if (imageFile.size > 5242880) {
        setIsEditing("false");
        showAlert(true, "danger", "Image Size must be less than 5MB");
        return;
      }

      formData.append("pfp", imageFile);

      const response = await fetch("http://localhost:5000/api/v1/update/pfp", {
        method: "PATCH",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getUserFromLocalStorage().user.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setIsEditing("false");
        showAlert(true, "danger", data.msg);
        return;
      }
      // localStorage
      let newUserInfo = { ...JSON.parse(localStorage.getItem("user")) };
      newUserInfo.user.image = data.image.src;
      localStorage.setItem("user", JSON.stringify(newUserInfo));

      imageFile = undefined;
      setIsEditing(false);
    } catch (error) {
      showAlert(true, "danger", "Unable to upload");
      setIsEditing(false);
      console.error(error);
    }
  };

  const handleUserInfo = async (e) => {
    e.preventDefault();
    try {
      const { name, email } = values;
      if (!name || !email) {
        showAlert(true, "danger", "Please provide name and email");
        return;
      }

      const response = await fetch("http://localhost:5000/api/v1/update/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserFromLocalStorage().user.token}`,
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert(true, "danger", data.msg);
        return;
      }
      // localStorage
      let newUserInfo = { ...JSON.parse(localStorage.getItem("user")) };
      newUserInfo.user.name = values.name;
      newUserInfo.user.email = values.email;

      localStorage.setItem("user", JSON.stringify(newUserInfo));
      showAlert(true, "success", "User Info has been editted");
      setValues({ name: "", email: "" });
    } catch (error) {
      showAlert(true, "danger", "Unable to edit user info");
      console.log(error);
    }
  };
  return (
    <main className='edit text-black'>
      <div className='edit-img'>
        <img
          src={getUserFromLocalStorage().user.image}
          alt={getUserFromLocalStorage().user.name}
        />
        <div className='upload'>
          {isEditing ? <Refresh /> : <Edit />}
          <input
            type='file'
            accept='image/*'
            onChange={handleUserImage}
            disabled={isEditing ? true : false}
          />
        </div>
      </div>

      <div className='edit-info'>
        <form className='input'>
          <div className='name'>
            <label htmlFor='name'>NAME</label>
            <input
              type='text'
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              value={values.name}
            />
          </div>

          <div className='email'>
            <label htmlFor='email'>EMAIL</label>
            <input
              type='email'
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              value={values.email}
            />
          </div>

          <button onClick={handleUserInfo}>EDIT</button>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
