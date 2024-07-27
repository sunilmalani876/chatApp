import { useAuthContext } from "@/context/useAuthContext";
import { handleGenericError, handleHTTPError } from "@/lib/utils";
import useConversation from "@/store/useConversation";
import { useEffect, useState } from "react";

export const useGetMessage = () => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const geNewtMessage = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/chat/${selectedConversation._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          handleHTTPError(res.status, res.statusText);
          return;
        }

        const json = await res.json();

        // console.log("get message", json.data);

        if (json.success) {
          if (Array.isArray(json.data.messages)) {
            setMessages([...json.data.messages]);
          } else {
            // Handle the empty array case (optional)
            setMessages([]); // Set messages to an empty array
          }
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
        handleGenericError(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) geNewtMessage();

    // geNewtMessage();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading, error };
};
