import { createContext, useContext, useState } from "react";

const UiContext = createContext();

const UiProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
