/* eslint-disable no-undef */
import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import { useSendMessage } from "@/hooks/useSendMessage";
import useConversation from "@/store/useConversation";
import { PaperPlaneIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MessageInput = () => {
  const message = useRef();
  const { socket } = useSocketContext();
  const { sendMessage, loading } = useSendMessage();
  const { user } = useAuthContext();
  const { selectedConversation, setIsTyping } = useConversation();

  useEffect(() => {
    const handleTyping = (value) => {
      if (value) {
        // console.log("socket", value);
        setIsTyping(value);
        setTimeout(() => setIsTyping(""), 3000);
      }
    };

    socket?.on("typing", handleTyping);

    return () => {
      socket?.off("typing", handleTyping);
    };
  }, [socket, setIsTyping]);

  const handleChange = () => {
    if (message.current.value) {
      socket.emit("typing", {
        senderId: user?._id,
        reciverId: selectedConversation?._id,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.current.value) return;

    await sendMessage(message.current.value);

    message.current.value = "";
  };

  return (
    <div className="w-full relative flex items-center max-w-xl text-white">
      <Input
        disabled={loading}
        ref={message}
        onChange={handleChange}
        placeholder="enter your message..."
        className="w-full h-[42px] bg-gray-700 outline-none border-none placeholder:text-slate-400 focus-visible:ring-2 font-bold focus-visible:ring-white focus-visible:ring-opacity-80 rounded-md px-2"
      />

      <Button
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
        className="absolute hover:bg-transparent hover:text-white right-0"
        variant="ghost"
      >
        {loading ? (
          <UpdateIcon className="w-4 h-4 animate-spin" />
        ) : (
          <PaperPlaneIcon className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

export default MessageInput;
