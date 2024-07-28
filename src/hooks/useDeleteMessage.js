/* eslint-disable no-unused-vars */
import { useAuthContext } from "@/context/useAuthContext";
import { handleGenericError, handleHTTPError } from "@/lib/utils";
import useConversation from "@/store/useConversation";
import { useState } from "react";
import { toast } from "sonner";
import { updateMessageById } from "./useListenDelete";

const useDeleteMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const { token } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const DeleteMessage = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/chat/${
          selectedConversation?._id
        }/${id}`,
        {
          method: "DELETE",
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

      const data = await res.json();

      const arr = updateMessageById(
        messages,
        data.data.message._id,
        "This message has been deleted"
      );

      if (data.success) {
        if (arr.length > 0) {
          setMessages([...arr]);
          return toast.success("Message deleted successfully");
        }
      }

      // if (data.success) {
      //   const updated = updateMessageAtIndex(
      //     messages,
      //     index,
      //     "This message has been deleted"
      //   );

      //   if (updated) {
      //     return toast.success("Message deleted successfully");
      //     //   setMessages([...messages]);
      //   } else {
      //     return toast.error("Message not found");
      //   }
      // }
    } catch (error) {
      handleGenericError(error);
    } finally {
      setLoading(false);
    }
  };

  return { DeleteMessage, loading };
};

export default useDeleteMessage;

export function findIndexOfObjectById(array, idToFind) {
  return array.findIndex((obj) => obj._id === idToFind);
}

export function updateMessageAtIndex(array, index, newMessage) {
  if (index >= 0 && index < array.length) {
    array[index].message = newMessage;
    return true;
  } else {
    return false;
  }
}

// const obj = {
//   _id: "66a394ae7bfd02f240eadc70",
//   senderId: "66a24583335baffa6db3de22",
//   reciverId: "66a24677335baffa6db3de3f",
//   message: "yo ",
//   isSeen: false,
//   createdAt: "2024-07-26T12:21:02.682Z",
//   updatedAt: "2024-07-26T12:21:02.682Z",
//   __v: 0,
// };
