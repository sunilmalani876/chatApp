import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  return (
    <form className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Search…"
        className="rounded-full bg-slate-800 border-none outline-none focus-visible:ring-1 focus-visible:ring-white placeholder:text-slate-300"
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
