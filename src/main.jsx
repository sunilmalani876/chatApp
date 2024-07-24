import { Toaster } from "@/components/ui/sonner";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authProvider.jsx";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <App />
    <Toaster position="top-right" />
  </AuthContextProvider>

  // </React.StrictMode>
);
