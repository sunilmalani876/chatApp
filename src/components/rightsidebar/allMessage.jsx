import { useAuthContext } from "@/context/useAuthContext";
import { useGetMessage } from "@/hooks/useGetMessage";
import { useParams } from "react-router-dom";
import { Message } from "../message/messages";

const AllMessage = () => {
  const { roomId } = useParams();
  const { user } = useAuthContext();
  const { data, loading } = useGetMessage(roomId);

  // const fromMe = data?.data?.messages?.filter(
  //   (item) => item?.from === user?.userId
  // );

  // console.log("fromMe", fromMe);

  console.log("all message", data?.data?.messages);
  return (
    <div className="w-full flex flex-col gap-1.5 px-3">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data?.data?.messages?.map((item, index) => (
          <Message key={index} message={item} roomId={roomId} />
        ))
      )}
    </div>
  );
};

export default AllMessage;
