/* eslint-disable no-unused-vars */
import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import { getRandomAvatars } from "@/lib/utils";
import NotFound from "@/pages/404page";
import useConversation from "@/store/useConversation";
import { useEffect } from "react";
import AllMessage from "./allMessage";
import Header from "./header";
import MessageInput from "./messageInput";
import Bug from "../../assets/bug.gif";
import { Button } from "../ui/button";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import useUnblocked from "@/hooks/useUnblocked";

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
              {BlockedByOther ? <BlocakeUser /> : <AllMessage />}

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

const BlocakeUser = () => {
  const { blockUser, Loading } = useUnblocked();

  const handleUnblocked = async () => {
    await blockUser();
  };

  return (
    <div className="w-full pt-5 flex flex-col gap-2 justify-center items-center">
      <img
        src={Bug}
        alt="bug Image"
        width={240}
        height={240}
        className="object-cover rounded-md"
      />
      <p className="text-yellow-400 text-lg w-full max-w-[240px] text-center leading-8 font-bold font-serif pt-2">
        Want to Un-Block him Click Here... 👇
      </p>
      <Button
        onClick={handleUnblocked}
        disabled={Loading}
        size="sm"
        className="bg-slate-800 flex justify-center items-center hover:bg-slate-800/80"
      >
        {Loading ? (
          "Un-Blocking...!"
        ) : (
          <span className="flex justify-center items-center gap-2">
            Un-Block <CircleBackslashIcon className="w-4 h-4" />
          </span>
        )}
      </Button>
    </div>
  );
};
