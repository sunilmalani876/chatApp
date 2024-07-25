import { useAuthContext } from "@/context/useAuthContext";
import React from "react";

const Messages = () => {
  return (
    <div>
      <Message />
    </div>
  );
};

export default Messages;

export const Message = ({ message, roomId }) => {
  const { user } = useAuthContext();

  const fromMe = message?.senderId === user?._id;
  console.log("fromMe", fromMe);

  return (
    <div
      className={`text-white px-2 max-w-xs text-start py-1 text-sm rounded-md bg-slate-700 ${
        fromMe ? "self-end" : "self-start"
      }`}
    >
      {message.message}
    </div>
    // <div
    //   className={`w-full max-w-sm flex flex-col text-white px-2 text-start py-1 text-sm rounded-md bg-slate-700 ${
    //     fromMe ? "" : "absolute left-0"
    //   }`}
    // >
    //   <div className="chat-image avatar">
    //     <div className="w-10 rounded-full">
    //       {/* <img
    //         alt="Tailwind CSS chat bubble component"
    //         src={
    //           "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
    //         }
    //       /> */}
    //     </div>
    //   </div>

    //   <div className={`chat-bubble text-white pb-2`}>{message.message}</div>
    //   {/* <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
    //     {formattedTime}
    //     12:32
    //   </div> */}
    // </div>
  );
};
