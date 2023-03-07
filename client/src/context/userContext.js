import { createContext, useContext } from "react";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const addUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const getUserFromLocalStorage = () => {
    const result = localStorage.getItem("user");
    const user = result ? JSON.parse(result) : null;
    return user;
  };
  return (
    <userContext.Provider
      value={{
        addUserToLocalStorage,
        removeUserFromLocalStorage,
        getUserFromLocalStorage,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserProvider = () => {
  return useContext(userContext);
};

export default UserProvider;
