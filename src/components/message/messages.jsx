import React from "react";

const Messages = () => {
  return (
    <div>
      <Message />
    </div>
  );
};

export default Messages;

const Message = () => {
  return (
    <div className="w-full max-w-sm bg-red-600 flex">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            }
          />
        </div>
      </div>

      <div className={`chat-bubble text-white pb-2`}>
        hi
        {/* {message.message} */}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {/* {formattedTime} */}
        12:32
      </div>
    </div>
  );
};
