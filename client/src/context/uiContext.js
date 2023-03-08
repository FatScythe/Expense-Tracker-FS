import { createContext, useContext, useState } from "react";
import { useUserContext } from "./userContext";

const UiContext = createContext();

const UiProvider = ({ children }) => {
  const { getUserFromLocalStorage } = useUserContext();
  const isUser = () => {
    if (getUserFromLocalStorage() === null) {
      return false;
    }
    if (
      getUserFromLocalStorage().user.name &&
      getUserFromLocalStorage().user.token
    ) {
      return true;
    }
    return false;
  };
  const [isLoggedIn, setIsLoggedIn] = useState(isUser());
  return (
    <UiContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => {
  return useContext(UiContext);
};

export default UiProvider;
