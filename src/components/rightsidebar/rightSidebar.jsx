/* eslint-disable no-unused-vars */
import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import { handleGenericError } from "@/lib/utils";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AllMessage from "./allMessage";
import Header from "./header";
import MessageInput from "./messageInput";

const RightSidebar = () => {
  const { roomId } = useParams();
  const { user, token } = useAuthContext();
  const { onlineUser } = useSocketContext();
  const isOnline = onlineUser?.includes(user?.userId);
  const [isLoading, setIsLoading] = useState(false);
  // const [message, setMessage] = useState({ message: "" });
  const sendMessage = useRef();
  // console.log(roomId);

  // useEffect(() => {
  //   console.log("useEffect");
  // }, [roomId]);

  // const { data, loading } = useFetcher(
  //   `${import.meta.env.VITE_BASE_URL}/chat/${roomId}`,
  //   "GET"
  // );

  // const { data, loading } = useGetMessage(roomId);

  // if (loading)
  //   return (
  //     <div className="flex justify-center">
  //       <div
  //         className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-yellow-500 border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
  //         role="status"
  //       >
  //         <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
  //           Loading...
  //         </span>
  //       </div>
  //     </div>
  //   );
  // console.log("data", data);
  // console.log("loading", loading);

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
    <div className="w-full h-full">
      <div className="w-full h-full break-words pt-20 pl-2">
        <AllMessage />
      </div>

      {/* HEADER AND SEND TEXT PART */}
      <div className="w-full flex justify-center">
        <Header />

        <div className="w-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 absolute bottom-0 bg-red-200 py-1 text-white flex justify-center items-center">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
