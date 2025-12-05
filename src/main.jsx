import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "./contexts/ConfirmContext.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ConfirmProvider>
        <LoaderProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
          />
        </LoaderProvider>
      </ConfirmProvider>
    </AuthProvider>
  </StrictMode>
);
