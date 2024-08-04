import { useSocketContext } from "@/context/useAuthContext";
import useConversation from "@/store/useConversation";
import { useEffect } from "react";

const useListenTyping = () => {
  const { socket } = useSocketContext();
  const { setIsTyping } = useConversation();

  useEffect(() => {
    const handleTyping = (value) => {
      if (value) {
        setIsTyping(value);
        setTimeout(() => setIsTyping(""), 3000);
      }
    };

    socket?.on("typing", handleTyping);

    return () => {
      socket?.off("typing", handleTyping);
    };
  }, [socket, setIsTyping]);
};

export default useListenTyping;
