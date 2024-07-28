/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import useConversation from "@/store/useConversation";
import { useEffect } from "react";

const useMessageSeen = () => {
  const { socket } = useSocketContext();
  const { user } = useAuthContext();
  const { selectedConversation, messages, setMessages } = useConversation();

  useEffect(() => {
    const lastMessageIsFromOtherUser =
      messages.length && messages[messages.length - 1]?.senderId !== user?._id;

    if (lastMessageIsFromOtherUser) {
      socket?.emit("markMessageAsSeen", {
        senderId: user?._id,
        reciverId: selectedConversation?._id,
      });
    }

    socket?.on("messageSeen", (conversationId) => {
      if (!Array.isArray(messages)) return;

      const updatedMessages = messages.map((message) => {
        if (conversationId.includes(message._id)) {
          return {
            ...message,
            isSeen: true,
          };
        }
        return message;
      });

      setMessages(updatedMessages);
    });

    return () => {
      socket?.off("messageSeen");
    };
  }, [messages, user?._id, socket, setMessages, selectedConversation?._id]);
};

export default useMessageSeen;
