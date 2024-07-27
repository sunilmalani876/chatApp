import { useGetMessage } from "@/hooks/useGetMessage";
import useListenMessages from "@/hooks/useListenMessages";
import { useEffect, useRef } from "react";
import { Message } from "../message/messages";
import useListenDelete from "@/hooks/useListenDelete";
import useUpdateLiatner from "@/hooks/useUpdateListner";

const AllMessage = () => {
  const { messages, loading } = useGetMessage();
  const lastMessageRef = useRef();

  useListenMessages();
  useListenDelete();
  useUpdateLiatner();

  // console.log("messages", messages);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="w-full flex flex-col gap-2 px-3">
      {loading ? (
        <div className="self-center pt-8">
          <p className="font-bold text-yellow-400">
            Wait, Try to fetch Your Chat...
          </p>
        </div>
      ) : messages?.length > 0 ? (
        messages?.map((item, index) => (
          <div
            key={index}
            ref={lastMessageRef}
            className="w-full flex flex-col"
          >
            <Message message={item} />
          </div>
        ))
      ) : (
        <div className="self-center pt-8">
          <p className="font-bold text-xl text-yellow-400">No Chat Found...</p>
          <p className="font-bold text-sm text-center text-yellow-300">
            Start a new Chat...
          </p>
        </div>
      )}
    </div>
  );
};

export default AllMessage;
