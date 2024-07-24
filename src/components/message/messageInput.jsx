import React from "react";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";

const MessageInput = () => {
  return (
    <form className="w-full fixed bottom-0 flex">
      <div className="w-full flex">
        <Input
          type="text"
          //   className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />
        <Button type="submit">
          <PaperPlaneIcon className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
