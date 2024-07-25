/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSocketContext } from "@/context/useAuthContext";
import { useFetcher } from "@/hooks/useFetcher";
import { getRandomAvatars, getRandomEmoji } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const Conversations = () => {
  const { data, error, loading } = useFetcher(
    `${import.meta.env.VITE_BASE_URL}/users/all`
  );

  if (loading) {
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
  }

  return (
    <div className="py-2 px-2 flex flex-col gap-0.5 overflow-auto custom-scrollbar">
      {data?.data?.map((user, index) => (
        <Conversation key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Conversations;

const Conversation = ({ user }) => {
  const { roomId } = useParams();

  const { onlineUser } = useSocketContext();
  const isOnline = onlineUser.includes(user._id);

  return (
    <>
      <Link
        to={`/chat/${user._id}`}
        key={user._id}
        className={`flex gap-2 items-center hover:bg-slate-700 rounded p-2 py-1 cursor-pointer ${
          roomId === user._id ? "bg-slate-700" : "bg-slate-800/70"
        }`}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full relative">
            {isOnline && (
              <div className="bg-green-600 w-[11px] h-[11px] absolute top-1 right-0 rounded-full" />
            )}
            <img
              className="object-cover rounded-full"
              src={`${getRandomAvatars()}`}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-[15px] text-gray-200">
              {user.email.split("@")[0]}
            </p>
            <span className="text-xl">{getRandomEmoji()}</span>
          </div>
        </div>
      </Link>

      <div className="my-0 py-0 h-1" />
    </>
  );
};
