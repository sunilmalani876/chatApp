/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import useListenBlocked from "@/hooks/useListenBlocked";
import { getRandomAvatars, getRandomEmoji } from "@/lib/utils";

import useConversation from "@/store/useConversation";
import { Skeleton } from "../ui/skeleton";
import useListenTyping from "@/hooks/useListenTyping";

const Conversations = ({ setOpen, loading, conversations }) => {
  if (loading) {
    return (
      <div className="h-full flex flex-col gap-5  ">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col overflow-auto custom-scrollbar"
          >
            <div className="flex items-center justify-around">
              <Skeleton className="h-14 w-14 rounded-full bg-gray-700" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-[110px] rounded-full bg-gray-700" />
                <Skeleton className="h-3 w-[110px] rounded-full bg-gray-700" />
              </div>
              <Skeleton className="h-8 w-8 rounded-xl bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-2 px-2 flex flex-col gap-0.5 overflow-auto custom-scrollbar">
      {conversations?.data?.map((user, index) => (
        <Conversation
          setOpen={setOpen}
          key={user._id}
          user={user}
          emoji={getRandomEmoji()}
          avatar={getRandomAvatars()}
        />
      ))}
    </div>
  );
};

export default Conversations;

const Conversation = ({ user, emoji, avatar, setOpen = () => {} }) => {
  const { onlineUser } = useSocketContext();
  const isOnline = onlineUser.includes(user._id);
  const { user: isBlockUser } = useAuthContext();
  const { selectedConversation, setSelectedConversation, isTyping } =
    useConversation();

  useListenTyping();
  useListenBlocked();

  const typedUser = isTyping === user?._id;

  // console.log("typedUser", isTyping);

  const BlockedByOther = isBlockUser?.isBlockedByUser?.some(
    (blockedUser) => blockedUser?.userId === user?.userId
  );

  const isSelected = selectedConversation?._id === user?._id;

  return (
    <>
      <div
        onClick={() => {
          setSelectedConversation(user);
          setOpen(false);
        }}
        key={user._id}
        className={`flex gap-2 items-center hover:bg-slate-700 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-slate-700" : "bg-slate-800/70"
        }`}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full relative">
            {isOnline && (
              <div className="bg-green-500 w-[11px] h-[11px] absolute top-1 right-0 rounded-full" />
            )}
            <img
              className="object-cover rounded-full"
              src={`${avatar}`}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-[15px] flex flex-col text-gray-200">
              {user.email.split("@")[0]}
              <span className="text-[9px]">
                {BlockedByOther ? (
                  "Blocked"
                ) : typedUser ? (
                  <span className="text-green-400 text-[10px]">Typing...</span>
                ) : (
                  ""
                )}
              </span>
            </p>

            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      <div className="my-0 py-0 h-1" />
    </>
  );
};
