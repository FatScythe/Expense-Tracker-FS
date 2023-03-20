import { createContext, useContext, useState } from "react";
import { useUserContext } from "./userContext";

const UiContext = createContext();

const UiProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const { getUserFromLocalStorage } = useUserContext();
  const isUser = () => {
    if (getUserFromLocalStorage() === null) {
      return false;
    }
    if (getUserFromLocalStorage().msg) return false;
    if (
      getUserFromLocalStorage().user.name &&
      getUserFromLocalStorage().user.token
    ) {
      return true;
    }
    return false;
  };
  const [isLoggedIn, setIsLoggedIn] = useState(isUser());

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  return (
    <UiContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        alert,
        setAlert,
        showAlert,
        isOptionOpen,
        setIsOptionOpen,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => {
  return useContext(UiContext);
};

export default UiProvider;
