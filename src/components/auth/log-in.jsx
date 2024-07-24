/* eslint-disable no-unused-vars */
import { handleGenericError, handleHTTPError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import lightlogo from "../../assets/lightlogo.png";
import login from "../../assets/login.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/useAuthContext";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(6, {
    message: "minimum length is 6.",
  }),
});

const LogIn = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const createAccount = async (values) => {
    console.log(values);
    let url = `${import.meta.env.VITE_BASE_URL}`;
    try {
      const res = await fetch(`${url}/auth/sign-in`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        console.log("res", res);
        handleHTTPError(res.status, res.statusText);
        return;
      }

      const result = await res.json();

      console.log(result);

      if (result.success) {
        Cookies.set("accessToken", result.data.accessToken);
        setToken(`${result.data.accessToken}`);
        navigate("/chat");
        return toast.success(`${result.message}`);
      }
    } catch (error) {
      handleGenericError(error);
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="w-full text-white px-3.5 py-2.5 sm:px-0 h-full flex justify-center items-center">
        <div className="w-full max-sm:flex-col max-sm:items-center max-sm:gap-8 border-slate-700 rounded-md border-[1px] shadow-sm shadow-slate-700 px-3 py-5 flex justify-center max-w-2xl bg-slate-950">
          <div className="p-1">
            <img
              src={login}
              alt="login"
              className="object-cover w-[240px] z-20 sm:w-[280px]"
            />
          </div>
          <div className="max-sm:w-full max-sm:gap-5 flex-1 flex flex-col items-center gap-3">
            <div className="flex flex-col max-sm:py-2 sm:pt-2 items-center gap-2">
              <img
                src={lightlogo}
                alt="logo"
                className="object-cover"
                height={120}
                width={120}
              />
              <p className="text-xs font-bold text-gray-500">
                Your Chatting App 🥂.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(createAccount)}
              className="w-full flex py-2 flex-col gap-3 my-auto items-center"
            >
              <div className="w-full flex flex-col gap-2 sm:max-w-[250px]">
                <Label className="self-start" htmlFor="email">
                  Enter Your Name*
                </Label>
                <Input
                  {...register("name", {
                    required: true,
                  })}
                  id="email"
                  className="w-full h-[42px] bg-gray-700 outline-none border-none focus-visible:ring-2 font-bold focus-visible:ring-white focus-visible:ring-opacity-80 rounded-md px-2"
                  placeholder="Email"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2 sm:max-w-[250px]">
                <Label className="self-start" htmlFor="email">
                  Enter Your Email*
                </Label>
                <Input
                  {...register("email", {
                    required: true,
                  })}
                  id="email"
                  type="email"
                  className="w-full h-[42px] bg-gray-700 outline-none border-none focus-visible:ring-2 font-bold focus-visible:ring-white focus-visible:ring-opacity-80 rounded-md px-2"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="w-full sm:max-w-[250px]">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[40px] rounded-md"
                >
                  {isSubmitting ? "Connecting..." : "Log In"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
