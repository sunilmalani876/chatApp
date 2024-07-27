/* eslint-disable no-unused-vars */
import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import { getRandomAvatars, handleGenericError } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AllMessage from "./allMessage";
import Header from "./header";
import MessageInput from "./messageInput";
import useConversation from "@/store/useConversation";
import NotFound from "@/pages/404page";

const RightSidebar = () => {
  const { roomId } = useParams();
  const { user, token } = useAuthContext();
  const { onlineUser } = useSocketContext();
  const isOnline = onlineUser?.includes(user?.userId);
  const [isLoading, setIsLoading] = useState(false);
  const sendMessage = useRef();

  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full h-full custom-scrollbar">
      <div className="w-full h-full break-words py-20 pl-2">
        {!selectedConversation ? (
          <NotFound />
        ) : (
          <>
            <div className="w-full flex justify-center">
              <Header avatar={getRandomAvatars()} />
              <AllMessage />

              <div className="w-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 fixed bottom-0 bg-red-200 py-1 text-white flex justify-center items-center">
                <MessageInput />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
