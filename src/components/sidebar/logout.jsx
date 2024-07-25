import { handleGenericError, handleHTTPError } from "@/lib/utils";
import { ExitIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthContext, useSocketContext } from "@/context/useAuthContext";
import Cookies from "js-cookie";
import { toast } from "sonner";

const Logout = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const { token, setToken } = useAuthContext();
  const { socket } = useSocketContext();

  const navigate = useNavigate();
  const handleLogout = async () => {
    let url = `${import.meta.env.VITE_BASE_URL}`;
    try {
      setLoading(true);

      const res = await fetch(`${url}/auth/sign-out`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // console.log("res", res);
        handleHTTPError(res.status, res.message);
        return;
      }

      const result = await res.json();

      console.log(result);

      if (result.success) {
        Cookies.remove("accessToken");
        navigate("/");
        setLoading(false);
        setToken(null);

        socket.close();

        return toast.success(`${result.message}`);
      }
    } catch (error) {
      handleGenericError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-auto w-full">
      <Button
        disabled={loading}
        onClick={handleLogout}
        className="w-full bg-slate-800 flex justify-center items-center gap-2 hover:bg-slate-800/80"
        type="submit"
      >
        {loading ? (
          "Watting..."
        ) : (
          <>
            <ExitIcon className="w-4 h-4" />
            {type !== "logo" && "Log-Out"}
          </>
        )}
      </Button>
    </div>
  );
};

export default Logout;
