import { useGetConversationContext } from "@/context/useAuthContext";
import Conversations from "./conversations";
import Logout from "./logout";
import SearchInput from "./searchInput";

const LeftSideBar = () => {
  const { loading, conversations } = useGetConversationContext();

  return (
    <section className="custom-scrollbar sticky py-2 px-1.5 left-0 top-0 lg:flex h-screen flex-col gap-2 overflow-y-auto border-r bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-gray-700 shadow-light-300 dark:shadow-none hidden lg:w-[266px] z-10">
      <SearchInput loading={loading} conversations={conversations} />

      <div className="divider w-full h-[0.5px] bg-slate-500 px-3" />

      <Conversations loading={loading} conversations={conversations} />

      <Logout />
    </section>
  );
};

export default LeftSideBar;
