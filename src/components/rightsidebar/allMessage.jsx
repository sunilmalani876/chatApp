import { useGetMessage } from "@/hooks/useGetMessage";
import useListenDelete from "@/hooks/useListenDelete";
import useListenMessages from "@/hooks/useListenMessages";
import useMessageSeen from "@/hooks/useMessageSeen";
import useUpdateLiatner from "@/hooks/useUpdateListner";
import { useEffect, useRef } from "react";
import { Message } from "../message/messages";
import { Skeleton } from "../ui/skeleton";

const AllMessage = () => {
  const { messages, loading } = useGetMessage();

  const lastMessageRef = useRef();

  useMessageSeen();

  useListenMessages();
  useListenDelete();
  useUpdateLiatner();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="w-full flex flex-col gap-2">
      {loading ? (
        <div className="flex flex-col pt-3">
          {[1, 2, 3].map(() => (
            <>
              <div className="flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-full bg-gray-700" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-10 w-[170px] rounded-2xl rounded-bl-none bg-gray-700" />
                </div>
              </div>
              <div className="flex self-end items-center gap-3">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-10 w-[170px] rounded-xl rounded-br-none bg-gray-700" />
                </div>
                <Skeleton className="h-14 w-14 rounded-full bg-gray-700" />
              </div>
            </>
          ))}
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

//      /\
//     /  \
//    /    \
//   /      \
//  /        \
// /          \
