/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useAuthContext } from "@/context/useAuthContext";
import { extractTime } from "@/lib/utils";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { BsCheck2All } from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useDeleteMessage from "@/hooks/useDeleteMessage";
import useUpdateMessage from "@/hooks/useUpdateMessage";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import useMessageSeen from "@/hooks/useMessageSeen";

export const Message = ({ message }) => {
  const [messageValue, setMessageValue] = useState(message?.message || "");
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const { DeleteMessage, loading } = useDeleteMessage();
  const { UpdateMessage, loading: updateMessageLoading } = useUpdateMessage();

  const fromMe = message?.senderId === user?._id;

  console.log("message?.isSeen", message?.isSeen);

  const handleDeleteMessage = async () => {
    if (message._id) {
      await DeleteMessage(message._id);
    }
  };

  const handleUpdateMessage = async () => {
    // console.log("messageValue", messageValue);
    if (messageValue === message.message) {
      return toast.success("Message Updated Successfully");
    }

    if (!messageValue) {
      return toast.error("Message cannot be empty");
    }

    if (message._id) {
      await UpdateMessage(message._id, messageValue, setOpen);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div
          className={`bg-gray-600 px-3 flex ${
            loading ? "text-neutral-200" : "text-white"
          } items-center py-2 w-max max-w-xs ${
            fromMe
              ? "self-end rounded-2xl rounded-br-none bg-gray-800"
              : "self-start rounded-2xl rounded-bl-none bg-gray-600"
          }`}
        >
          {loading ? (
            "Deleting..."
          ) : (
            <p className="flex flex-col">
              {message.message}
              {fromMe && (
                <BsCheck2All
                  className={`w-4 h-4 ${
                    message?.isSeen
                      ? "text-sky-400 stroke-[0.5px]"
                      : "text-white stroke-[0.5px]"
                  } ${fromMe ? "self-end" : "self-start"}`}
                />
              )}
            </p>
          )}
          <span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="focus-visible:ring-0">
                {fromMe && (
                  <Button
                    variant="ghost"
                    className="hover:bg-transparent focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 hover:text-white"
                    size="icon"
                  >
                    <DotsVerticalIcon className="w-4 h-4" />
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="left"
                alignOffset={-30}
                className="bg-gray-800 text-white border-slate-700"
              >
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => setMessageValue(message.message)}
                    className="focus:bg-gray-700/80 focus:text-white"
                  >
                    UPDATE
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator className="mx-1.5 bg-gray-500" />
                <DropdownMenuItem
                  onClick={handleDeleteMessage}
                  className="focus:bg-red-500 focus:text-white"
                >
                  DELETE
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
        <p
          className={`text-[10px] text-end ${
            fromMe ? "self-end" : "self-start"
          }`}
        >
          {extractTime(message?.createdAt)}
        </p>
        <DialogContent className="bg-slate-900 border-gray-700 text-white">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-center">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription className="text-neutral-100 text-center">
              This action cannot be undone. Are you sure you want to permanently
              update this message from our servers?
            </DialogDescription>
            <Textarea
              className="w-full h-[42px] bg-gray-700 outline-none border-none focus-visible:ring-2 font-bold focus-visible:ring-white focus-visible:ring-opacity-80 rounded-md px-2"
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              disabled={updateMessageLoading}
            />
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-3">
            <Button
              onClick={() => setOpen(false)}
              className="bg-gray-800 hover:bg-gray-800/80"
              type="submit"
            >
              Cancel
            </Button>
            <Button
              disabled={updateMessageLoading}
              onClick={handleUpdateMessage}
              className="bg-gray-800 hover:bg-gray-800/80"
              type="submit"
            >
              {updateMessageLoading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
