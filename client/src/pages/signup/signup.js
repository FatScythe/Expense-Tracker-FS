import { useState } from "react";
import "./signup.css";
import { useUserProvider } from "../../context/userContext";
import Post from "../../hooks/usePost";

const SignUp = () => {
  const { addUserToLocalStorage } = useUserProvider();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };
  const [values, setValues] = useState(initialValues);

  const handleisMemberToggle = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleSubmit = async (e) => {
    // try {
    // } catch (error) {}
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      alert("Please fill all field");
      return;
    }

    // LOGIN

    if (isMember) {
      const result = Post("http://localhost:5000/api/v1/auth/login", {
        email: values.email,
        password: values.password,
      });
      // const post = await fetch(`http://localhost:5000/api/v1/auth/login`, {
      //   method: "POST",
      //   headers: { "content-type": "application/json" },
      //   body: JSON.stringify({
      //     email: values.email,
      //     password: values.password,
      //   }),
      // });

      // const result = await post.json();
      addUserToLocalStorage(result);
      // if (!post.ok) {
      //   alert(result.msg);
      // }
      return;
    }

    // REGISTER

    const post = await fetch(`http://localhost:5000/api/v1/auth/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });

    const result = await post.json();
    if (!post.ok) {
      alert(result.msg);
    }
    console.log(result);
  };

  return (
    <section className='sign-up'>
      <div className='card'>
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {!values.isMember && (
          <div className='fields'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
        )}
        <div className='fields'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>

        <div className='fields'>
          <label htmlFor='pwd'>Password</label>
          <input
            type='password'
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>

        <div className='footer'>
          <button className='submit' type='submit' onClick={handleSubmit}>
            Submit
          </button>
          <button className='demo'>Demo User</button>

          <p className='que'>
            <span>
              {values.isMember
                ? "You don't have an account? "
                : "You already have an account? "}
            </span>
            <button onClick={handleisMemberToggle}>
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
