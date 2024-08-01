/* eslint-disable no-unused-vars */
import { useAuthContext } from "@/context/useAuthContext";
import { handleGenericError, handleHTTPError } from "@/lib/utils";
import useConversation from "@/store/useConversation";
import { useState } from "react";
import { toast } from "sonner";
import { updateMessageById } from "./useListenDelete";

const useUpdateMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const UpdateMessage = async (id, message, setOpen) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/chat/s/${
          selectedConversation?._id
        }/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: message }),
        }
      );

      if (!res.ok) {
        handleHTTPError(res.status, res.message);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setOpen(false);
        const arr = updateMessageById(
          messages,
          id,
          message,
          data.data.createdAt,
          data.data.updatedAt
        );

        if (arr.length > 0) {
          setMessages([...arr]);
          return toast.success("Message Updated Successfully");
        }
      }
    } catch (error) {
      handleGenericError(error);
    } finally {
      setLoading(false);
    }
  };

  return { UpdateMessage, loading };
};

export default useUpdateMessage;
