import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import { useSendMessage } from "@/hooks/useSendMessage";
import useConversation from "@/store/useConversation";
import { PaperPlaneIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MessageInput = () => {
  const message = useRef();
  const { socket } = useSocketContext();
  const { sendMessage, loading } = useSendMessage();
  const { user } = useAuthContext();
  const { selectedConversation, setIsTyping } = useConversation();
  // const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket?.on("typing", (value) => {
      console.log("socket typing hook on ", value);

      setIsTyping(value);
      const running = setTimeout(() => setIsTyping(""), 300);
    });

    return () => {
      socket?.off("typing", handleTypingEvent);
      clearTimeout(running);
    };
  }, [setIsTyping]);

  const handleChange = () => {
    if (message.current.value) {
      socket.emit("typing", {
        senderId: user?._id,
        reciverId: selectedConversation?._id,
      });
    }
  };

  // Handle typing indicator
  // useEffect(() => {
  //   let typingTimer;

  //   const handleTypingEvent = (message) => {
  //     console.log("Typing message:", message);
  //     setIsTyping(true);

  //     // Clear the existing timer
  //     if (typingTimer) {
  //       clearTimeout(typingTimer);
  //     }

  //     // Set a new timer to hide typing message after 3 seconds
  //     typingTimer = setTimeout(() => {
  //       setIsTyping(false);
  //     }, 100); // Adjust this value as needed
  //   };

  //   socket?.on("typing", handleTypingEvent);

  //   return () => {
  //     if (typingTimer) {
  //       clearTimeout(typingTimer);
  //     }
  //     socket?.off("typing", handleTypingEvent);
  //   };

  //   // const handleTypingEvent = (message) => {
  //   //   console.log("typing message", message);
  //   //   setIsTyping(true);
  //   //   // Hide typing message after 3 seconds
  //   //   setTimeout(() => setIsTyping(false), 300);
  //   // };

  //   // socket?.on("typing", handleTypingEvent);

  //   // return () => {
  //   //   socket?.off("typing", handleTypingEvent);
  //   // };
  // }, []);

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
        onChange={handleChange} // Emit typing event on change
        placeholder="enter your message..."
        className="w-full h-[42px] bg-gray-700 outline-none border-none placeholder:text-slate-400 focus-visible:ring-2 font-bold focus-visible:ring-white focus-visible:ring-opacity-80 rounded-md px-2"
      />
      {/* {isTyping && (
        <div className="text-gray-400 mt-1">Someone is typing...</div>
      )} */}

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
