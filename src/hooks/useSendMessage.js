import { useAuthContext } from "@/context/useAuthContext";
import useConversation from "@/store/useConversation";
import { useState } from "react";
import { toast } from "sonner";

export const useSendMessage = () => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/chat/${selectedConversation._id}`,
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

      // console.log("send message", data.data);
      setMessages([...messages, data.data]);
      console.log("message", messages);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // console.log("messagess", messages);
  return { sendMessage, loading };
};
