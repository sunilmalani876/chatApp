import { useContext } from "react";
import { AuthContext } from "./authProvider";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuthContext must be used within a AuthContext");

  return context;
};
