import { useContext } from "react";
import { AuthContext } from "./authProvider";
import { SocketContext } from "./socketContext";
import { ConversationContext } from "./getConversation";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuthContext must be used within a AuthContext");

  return context;
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (context === undefined)
    throw new Error("useSocketContext must be used within a SocketContext");

  return context;
};

export const useGetConversationContext = () => {
  const context = useContext(ConversationContext);

  if (context === undefined)
    throw new Error(
      "useGetConversationContext must be used within a ConversationContext"
    );

  return context;
};
