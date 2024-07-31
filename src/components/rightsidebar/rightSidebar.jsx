/* eslint-disable no-unused-vars */
import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import { getRandomAvatars } from "@/lib/utils";
import NotFound from "@/pages/404page";
import useConversation from "@/store/useConversation";
import { useEffect } from "react";
import AllMessage from "./allMessage";
import Header from "./header";
import MessageInput from "./messageInput";

const RightSidebar = () => {
  const { user } = useAuthContext();
  const { onlineUser } = useSocketContext();
  const { user: isBlockUser } = useAuthContext();

  const { selectedConversation, setSelectedConversation } = useConversation();

  const BlockedByOther = isBlockUser?.isBlockedByUser?.some(
    (blockedUser) => blockedUser?.userId === selectedConversation?.userId
  );

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full h-full custom-scrollbar">
      <div className="w-full h-full break-words py-20 px-2">
        <div className="w-full flex justify-center">
          <Header avatar={getRandomAvatars()} />
        </div>

        {!selectedConversation ? (
          <NotFound />
        ) : (
          <>
            <div className="w-full flex justify-center">
              {BlockedByOther ? "You Blocked Him" : <AllMessage />}

              <div className="w-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 fixed bottom-0 bg-red-200 px-1 py-1 text-white flex justify-center items-center">
                <MessageInput BlockedByOther={BlockedByOther} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
