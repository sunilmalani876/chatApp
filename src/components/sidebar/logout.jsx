import React, { useState } from "react";
import { Button } from "../ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { handleGenericError, handleHTTPError } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    let url = `${import.meta.env.VITE_BASE_URL}`;
    try {
      setLoading(true);

      const res = await fetch(`${url}/auth/sign-out`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${}`,
        },
      });

      if (!res.ok) {
        // console.log("res", res);
        handleHTTPError(res.status);
        return;
      }

      const result = await res.json();

      console.log(result);

      if (result.success) {
        Cookies.remove("accessToken");
        navigate("/");
        setLoading(false);
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
            Log-Out
          </>
        )}
      </Button>
    </div>
  );
};

export default Logout;
