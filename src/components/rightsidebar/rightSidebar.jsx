import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import {
  getRandomAvatars,
  getRandomEmoji,
  handleGenericError,
} from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Logout from "../sidebar/logout";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaperPlaneIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useFetcher } from "@/hooks/useFetcher";
import { submitMessage } from "@/lib/function";
import { useGetMessage } from "@/hooks/useGetMessage";
import Header from "./header";

const RightSidebar = () => {
  const { roomId } = useParams();
  const { user, token } = useAuthContext();
  const { onlineUser } = useSocketContext();
  const isOnline = onlineUser?.includes(user?.userId);
  const [isLoading, setIsLoading] = useState(false);
  // const [message, setMessage] = useState({ message: "" });
  const sendMessage = useRef();
  console.log(roomId);

  // useEffect(() => {
  //   console.log("useEffect");
  // }, [roomId]);

  // const { data, loading } = useFetcher(
  //   `${import.meta.env.VITE_BASE_URL}/chat/${roomId}`,
  //   "GET"
  // );

  const { data, loading } = useGetMessage(roomId);

  if (loading)
    return (
      <div className="flex justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-yellow-500 border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  console.log("data", data);
  // const [] = useState();

  async function handlesubmit(e) {
    e.preventDefault();
    // console.log();

    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/chat/${roomId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: sendMessage.current.value,
            isSeen: "false",
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        sendMessage.current.value = "";
      }

      console.log("send message", result);
    } catch (error) {
      handleGenericError(error);
    } finally {
      setIsLoading(false);
    }

    // const message = sendMessage.current.value;

    // submitMessage(message, roomId);
    // console.log(sendMessage.current.value);
  }

  // console.log(roomId);
  // console.log("user", user?.userId);
  // console.log("onlineUser", onlineUser);
  // console.log("isOnline", isOnline);

  return (
    <div className="w-full">
      <div className="max-w-md w-fit pt-20 pl-2">
        {data?.data?.messages?.map((item) => (
          <div className="text-white p-2 rounded-md bg-red-400">
            {item?.message}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Header />

        <div className="w-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 absolute bottom-0 bg-red-200 py-1 text-white flex justify-center items-center">
          <div className="w-full relative flex items-center max-w-xl text-white">
            <Input
              ref={sendMessage}
              placeholder="enter your message..."
              className="w-full h-[42px] bg-gray-700 outline-none border-none placeholder:text-slate-400 focus-visible:ring-2 font-bold focus-visible:ring-white focus-visible:ring-opacity-80 rounded-md px-2"
            />
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handlesubmit}
              className="absolute hover:bg-transparent hover:text-white right-0"
              variant="ghost"
            >
              {isLoading ? (
                <UpdateIcon className="w-4 h-4 animate-spin" />
              ) : (
                <PaperPlaneIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
