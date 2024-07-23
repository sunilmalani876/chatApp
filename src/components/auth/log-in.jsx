/* eslint-disable no-unused-vars */
import { useState } from "react";
import lightlogo from "../../assets/lightlogo.png";
import login from "../../assets/login.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LogIn = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="w-full text-white px-3.5 sm:px-0 h-full flex justify-center items-center">
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
            <div className="w-full flex py-2 flex-col gap-4 my-auto items-center">
              <div className="w-full flex flex-col gap-2 sm:max-w-[250px]">
                <Label className="self-start" htmlFor="email">
                  Enter Your Email*
                </Label>
                <Input
                  className="w-full h-[42px] bg-gray-700 outline-none border-none focus-visible:ring-2 font-bold focus-visible:ring-white focus-visible:ring-opacity-80 rounded-md px-2"
                  placeholder="Email"
                />
              </div>
              <div className="w-full sm:max-w-[250px]">
                <Button type="submit" className="w-full h-[40px] rounded-md">
                  {loading ? "Connecting..." : "Log In"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
