import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { handleHTTPError } from "@/lib/utils";

export const ConversationContext = createContext();

export const ConversationContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          handleHTTPError(res.status, res.statusText);
          return;
        }

        const json = await res.json();

        if (json.success) {
          setConversations(json);
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getConversations();
    }
  }, [token]);

  return (
    <ConversationContext.Provider value={{ conversations, loading }}>
      {children}
    </ConversationContext.Provider>
  );
};
