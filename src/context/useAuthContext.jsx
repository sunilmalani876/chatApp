import { useContext } from "react";
import { AuthContext } from "./authProvider";
import { SocketContext } from "./socketContext";

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
