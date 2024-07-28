import LeftSideBar from "@/components/sidebar/leftsidebar";
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
  );
};

export default Chat;
