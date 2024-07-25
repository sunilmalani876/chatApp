import MessageContainer from "@/components/message/MessageContainer";
import LeftSideBar from "@/components/sidebar/leftsidebar";
import Sidebar from "@/components/sidebar/sidebar";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Chat = () => {
  return (
    <main className="w-full relative">
      <div className="flex text-white">
        <LeftSideBar />

        <section className="flex relative min-h-screen flex-1 flex-col pt-1 pb-6 max-md:pb-14">
          <Outlet />
        </section>
      </div>
    </main>
    // <div className="w-full flex min-h-screen overflow-hidden text-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
    //   <Sidebar />
    //   <MessageContainer />
    // </div>
  );
};

export default Chat;
