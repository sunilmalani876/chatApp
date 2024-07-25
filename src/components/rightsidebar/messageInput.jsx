import { useSendMessage } from "@/hooks/useSendMessage";
import { PaperPlaneIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MessageInput = () => {
  //   const [message, setMessage] = useState("");
  const message = useRef();
  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.current.value) return;

    await sendMessage(message.current.value);

    message.current.value = "";
  };

  return (
    <div className="w-full relative flex items-center max-w-xl text-white">
      <Input
        disabled={loading}
        ref={message}
        placeholder="enter your message..."
        className="w-full h-[42px] bg-gray-700 outline-none border-none placeholder:text-slate-400 focus-visible:ring-2 font-bold focus-visible:ring-white focus-visible:ring-opacity-80 rounded-md px-2"
      />
      <Button
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
        className="absolute hover:bg-transparent hover:text-white right-0"
        variant="ghost"
      >
        {loading ? (
          <UpdateIcon className="w-4 h-4 animate-spin" />
        ) : (
          <PaperPlaneIcon className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

export default MessageInput;
