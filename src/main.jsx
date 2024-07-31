import { Toaster } from "@/components/ui/sonner";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authProvider.jsx";
import "./global.css";
import { SocketContextProvider } from "./context/socketContext.jsx";
import { ConversationContextProvider } from "./context/getConversation.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <ConversationContextProvider>
      <SocketContextProvider>
        <App />
        <Toaster position="top-right" />
      </SocketContextProvider>
    </ConversationContextProvider>
  </AuthContextProvider>

  // </React.StrictMode>
);
