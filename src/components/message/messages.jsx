/* eslint-disable react/prop-types */
import { useAuthContext } from "@/context/useAuthContext";
import { extractTime } from "@/lib/utils";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Message = ({ message }) => {
  // console.log("message", message);
  const { user } = useAuthContext();

  const fromMe = message?.senderId === user?._id;

  return (
    <>
      <div
        className={`bg-gray-600 px-3 flex items-center py-2 w-max max-w-xs ${
          fromMe
            ? "self-end text-white rounded-2xl rounded-br-none bg-gray-800"
            : "self-start rounded-2xl rounded-bl-none bg-gray-600"
        }`}
      >
        {message.message}
        <span>
          <Button
            variant="ghost"
            className="hover:bg-transparent hover:text-white"
            size="icon"
          >
            <DotsVerticalIcon className="w-4 h-4" />
          </Button>
        </span>
      </div>
      <p
        className={`text-[10px] text-end ${fromMe ? "self-end" : "self-start"}`}
      >
        {extractTime(message?.createdAt)}
      </p>
    </>
  );
};
