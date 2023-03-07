import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UiProvider from "./context/uiContext";
import UserProvider from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UiProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </UiProvider>
  </React.StrictMode>
);
