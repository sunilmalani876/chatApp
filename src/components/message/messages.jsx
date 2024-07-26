import { useAuthContext } from "@/context/useAuthContext";
import { extractTime } from "@/lib/utils";
import React from "react";

export const Message = ({ message }) => {
  // console.log("message", message);
  const { user } = useAuthContext();

  const fromMe = message?.senderId === user?._id;

  return (
    <>
      <div
        className={`bg-gray-600 px-3 py-2 w-max max-w-xs ${
          fromMe
            ? "self-end text-white rounded-2xl rounded-br-none bg-gray-800"
            : "self-start rounded-2xl rounded-bl-none bg-gray-600"
        }`}
      >
        {message.message}
        <p
          className={`text-[10px] text-end ${
            fromMe ? "self-end" : "self-start"
          }`}
        >
          {extractTime(message?.createdAt)}
        </p>
      </div>
    </>
  );
};
