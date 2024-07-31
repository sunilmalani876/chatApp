import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetConversationContext } from "@/context/useAuthContext";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Conversations from "../sidebar/conversations";
import Logout from "../sidebar/logout";
import SearchInput from "../sidebar/searchInput";
import { Button } from "../ui/button";

const MobileNavBar = () => {
  const [open, setOpen] = useState(false);
  const { loading, conversations } = useGetConversationContext();

  return (
    <div>
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
              <SearchInput loading={loading} conversations={conversations} />
            </SheetTitle>
            <SheetDescription className="custom-scrollbar">
              <div className="divider w-full h-[0.5px] bg-slate-500 px-3" />

              <Conversations
                setOpen={setOpen}
                loading={loading}
                conversations={conversations}
              />

              <Logout />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavBar;
