import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import useConversation from "@/store/useConversation";
import React, { useEffect } from "react";

const useListenBlocked = () => {
  const { socket } = useSocketContext();
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    // console.log("useListenBlocked Hook");
    socket?.on("blocked", (newMessage) => {
      // console.log("Block Hook", newMessage);
    });

    return () => socket?.off("newMessage");
  }, [socket, setUser]);
};

export default useListenBlocked;
