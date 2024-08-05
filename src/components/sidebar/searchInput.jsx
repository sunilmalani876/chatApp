import useConversation from "@/store/useConversation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchInput = ({ conversations, loading }) => {
  const [search, setSearch] = useState("");

  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return toast.error("Search Is empty...");

    const conversation = conversations?.data?.find((c) =>
      c.email.split("@")[0].includes(search)
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Search…"
        className="rounded-full text-white bg-slate-800 border-none outline-none focus-visible:ring-1 focus-visible:ring-white placeholder:text-slate-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        type="submit"
        size="sm"
        className="text-white hover:bg-slate-800/80"
      >
        <MagnifyingGlassIcon className="w-6 h-6 outline-none" />
      </Button>
    </form>
  );
};

export default SearchInput;
