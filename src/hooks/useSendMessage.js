import { useAuthContext } from "@/context/useAuthContext";
import useConversation from "@/store/useConversation";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const useSendMessage = () => {
  const { roomId } = useParams();
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/chat/${roomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();

      console.log("send message", data);
      //   if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
