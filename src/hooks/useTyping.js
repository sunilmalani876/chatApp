import React, { useEffect, useState } from "react";

const useTyping = () => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleTypingEvent = (message) => {
      console.log("typing message", message);
      setIsTyping(true);
      // Hide typing message after 3 seconds
      setTimeout(() => setIsTyping(false), 3000);
    };

    socket?.on("typing", handleTypingEvent);

    return () => {
      socket?.off("typing", handleTypingEvent);
    };
  }, [socket]);

  return { isTyping, setIsTyping };
};

export default useTyping;
