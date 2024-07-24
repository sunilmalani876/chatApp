import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthContextProvider } from "./context/authProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <App />
    <Toaster position="top-right" />
  </AuthContextProvider>

  // </React.StrictMode>
);
