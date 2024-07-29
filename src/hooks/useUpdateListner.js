import { useSocketContext } from "@/context/useAuthContext";
import useConversation from "@/store/useConversation";
import { useEffect } from "react";
import { updateMessageById } from "./useListenDelete";
// import { updateMessageById } from "./useListenDelete";

const useUpdateLiatner = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("updtMsg", (newMessage) => {
      const result = updateMessageById(
        messages,
        newMessage?._id,
        newMessage?.message
      );

      setMessages([...result]);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
};

export default useUpdateLiatner;
