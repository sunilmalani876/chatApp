import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import { getRandomAvatars, handleGenericError } from "@/lib/utils";
import Logout from "../sidebar/logout";

import useConversation from "@/store/useConversation";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import MobileNavBar from "./mobileNavBar";

const Header = () => {
  const { user, token, setUser } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { onlineUser } = useSocketContext();
  const { selectedConversation } = useConversation();

  const isOnline = onlineUser?.includes(user?._id);

  const BlockedByOther = user?.isBlockedByUser?.some(
    (blockedUser) => blockedUser?.userId === selectedConversation?.userId
  );

  // console.log("BlockedByOther", BlockedByOther);

  const handleBlock = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/chat/blc-usr/${
          selectedConversation?._id
        }`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success(`${result?.message}`);

        setUser((prevUser) => {
          return {
            ...prevUser,
            isBlockedByUser: [
              ...prevUser?.isBlockedByUser,
              result?.data?.blockedUser,
            ],
          };
        });
      } else {
        setIsLoading(false);
        toast.error(`${result?.data?.message}`);
      }

      console.log(result);
    } catch (error) {
      handleGenericError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl fixed top-0 sm:top-1 sm:rounded-md bg-gray-700 px-2 py-2 flex items-center">
      <div className="flex flex-1 justify-between">
        <div className="flex gap-3 items-center">
          <img
            className="object-cover rounded-full"
            width={40}
            src={`${getRandomAvatars()}`}
            alt="user avatar"
          />
          {user && (
            <p className="font-bold text-[13px] text-gray-200">
              {user?.email} <br />
              {isOnline && (
                <span className="text-[11px] text-green-500 font-bold">
                  Online
                </span>
              )}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Logout type={"logo"} />
          {selectedConversation &&
            (BlockedByOther ? (
              ""
            ) : (
              <Button
                onClick={handleBlock}
                className="bg-slate-800 flex justify-center items-center gap-2 hover:bg-slate-800/80"
              >
                {isLoading ? "Wait..." : <CircleBackslashIcon />}
              </Button>
            ))}
          <div className="lg:hidden">
            <MobileNavBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
