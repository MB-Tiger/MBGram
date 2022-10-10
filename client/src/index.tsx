import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./router/MyRoutes";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/private-theming";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <MyRoutes />
        <ToastContainer autoClose={3000} draggable={false} />
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
