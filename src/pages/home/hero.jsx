/* eslint-disable react/no-unknown-property */
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-full">
      <div className="relative h-full mx-auto flex max-w-2xl flex-col items-center justify-center">
        <div className="mb-8 flex">
          <Link
            to="https://github.com/sunilmalani456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]"></span>
              <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full px-3 py-1 text-xs font-medium leading-5 backdrop-blur-xl bg-black text-slate-200">
                Chateo ⚡️
                <span className="inline-flex items-center pl-2 text-white">
                  Chat Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="pl-0.5 text-white"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </span>
          </Link>
        </div>
        <h2 className="text-center flex flex-col items-center text-3xl font-medium text-gray-50 sm:text-6xl">
          Connect Instantly with
          <span className="inline-flex pt-1 animate-background-shine bg-[linear-gradient(110deg,#EFF3F8,45%,#1e293b,55%,#EFF3F8)] bg-[length:260%_100%] bg-clip-text text-6xl text-transparent">
            CHATEO
          </span>
        </h2>
        <p className="mt-6 px-6 text-center text-lg leading-6 dark:text-gray-600 text-gray-200">
          ChatWave revolutionizes communication with lightning-fast messaging
          and an intuitive interface. Connect with friends 😎, family, and
          colleagues instantly, making every conversation seamless and enjoyable
          🥂.
        </p>

        <div className="mt-10 flex gap-4">
          <Button
            asChild
            size="sm"
            className="bg-white/90 flex items-center gap-1 text-black hover:bg-white"
          >
            <Link to="/login">
              Go To LogIn
              <ArrowRightIcon className="w-4 h-4 text-black" />
            </Link>
          </Button>
          <Button
            size="sm"
            className="bg-white/90 flex items-center gap-1 bg-neutral-900 hover:bg-neutral-800"
          >
            Let&rsquo;s Chat
          </Button>
        </div>
        <div class="flex items-center justify-center py-8">
          <span class="text-sm text-neutral-200">
            Made by
            <Link
              to="https://github.com/sunilmalani456"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-1 text-neutral-100"
            >
              @Sunil🚀
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
