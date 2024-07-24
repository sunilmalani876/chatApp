import React from "react";
import SearchInput from "./searchInput";
import Conversations from "./conversations";
import Logout from "./logout";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3" />
      <Conversations />

      <Logout />
    </div>
  );
};

export default Sidebar;
