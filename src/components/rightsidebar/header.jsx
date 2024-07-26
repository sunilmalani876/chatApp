import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import { getRandomAvatars } from "@/lib/utils";
import Logout from "../sidebar/logout";

const Header = () => {
  const { user } = useAuthContext();
  const { onlineUser } = useSocketContext();
  const isOnline = onlineUser?.includes(user?._id);

  return (
    <div className="w-full max-w-xl fixed top-1 rounded-md bg-gray-700 px-2 py-2 flex items-center">
      <div className="flex flex-1 justify-between">
        <div className="flex gap-3 items-center">
          <img
            className="object-cover rounded-full"
            width={45}
            src={`${getRandomAvatars()}`}
            alt="user avatar"
          />
          {user && (
            <p className="font-bold text-[13px] text-gray-200">
              {user?.email} <br />{" "}
              {isOnline && (
                <span className="text-[11px] text-green-500 font-bold">
                  Online
                </span>
              )}
            </p>
          )}
        </div>
        <div>
          <Logout type={"logo"} />
        </div>
      </div>
    </div>
  );
};

export default Header;
