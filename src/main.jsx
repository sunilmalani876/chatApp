import { Toaster } from "@/components/ui/sonner";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authProvider.jsx";
import "./global.css";
import { SocketContextProvider } from "./context/socketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <SocketContextProvider>
      <App />
      <Toaster position="top-right" />
    </SocketContextProvider>
  </AuthContextProvider>

  // </React.StrictMode>
);
