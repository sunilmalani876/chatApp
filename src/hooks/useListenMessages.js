import { useSocketContext } from "@/context/useAuthContext";
import useConversation from "@/store/useConversation";
import { useEffect } from "react";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMsg", (newMessage) => {
      //   newMessage.shouldShake = true;
      //   const sound = new Audio(notificationSound);
      //   sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
