import { useEffect } from "react";
// CSS
import "./alert.css";
// Context
import { useUiContext } from "../../context/uiContext";

// Component
import { Cancel } from "../icons/icons";

const Alert = () => {
  const { alert, setAlert, showAlert: removeAlert } = useUiContext();
  const { msg, type, show } = alert;
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert();
    }, 5000);
    return () => clearTimeout(timer);
  });
  return (
    <div
      className={`${
        show ? "top-38 opacity-95" : "opacity-0 transition-opacity duration-500"
      } alert-${type} alert`}
    >
      <p className='basis-4/5'>{msg}</p>
      <button
        onClick={() => {
          setAlert({ ...alert, show: false });
        }}
        className='text-right w-fit rounded-full border border-white'
      >
        <Cancel />
      </button>
    </div>
  );
};

export default Alert;
