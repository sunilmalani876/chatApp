import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import {
  getRandomAvatars,
  handleGenericError,
  handleHTTPError,
} from "@/lib/utils";
import Logout from "../sidebar/logout";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleBackslashIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import SearchInput from "../sidebar/searchInput";
import Conversations from "../sidebar/conversations";
import { useState } from "react";
import useConversation from "@/store/useConversation";
import { toast } from "sonner";

const Header = () => {
  const { user, token, setUser } = useAuthContext();
  const [open, setOpen] = useState(false);
  const { onlineUser } = useSocketContext();
  const { selectedConversation, setIsBlocked } = useConversation();

  const isOnline = onlineUser?.includes(user?._id);

  // console.log("current user", user);
  const handleBlock = async () => {
    // console.log(selectedConversation?._id);
    try {
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

        // setIsBlocked()
      } else {
        toast.error(`${result?.data?.message}`);
      }

      console.log(result);
    } catch (error) {
      handleGenericError(error);
    }
  };

  return (
    <div className="w-full max-w-xl fixed top-1 rounded-md bg-gray-700 px-2 py-2 flex items-center">
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
          {selectedConversation && (
            <Button
              onClick={handleBlock}
              className="bg-slate-800 flex justify-center items-center gap-2 hover:bg-slate-800/80"
            >
              <CircleBackslashIcon />
            </Button>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Button
                size="icon"
                className="bg-slate-800 lg:hidden flex justify-center items-center gap-2 hover:bg-slate-800/80"
              >
                <HamburgerMenuIcon className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-slate-900 custom-scrollbar overflow-y-scroll border-gray-800 text-white py-2">
              <SheetHeader>
                <SheetTitle>
                  <SearchInput />
                </SheetTitle>
                <SheetDescription className="custom-scrollbar">
                  <div className="divider w-full h-[0.5px] bg-slate-500 px-3" />

                  <Conversations setOpen={setOpen} />

                  <Logout />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
