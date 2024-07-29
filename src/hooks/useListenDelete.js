/* eslint-disable no-unused-vars */
import { useSocketContext } from "@/context/useAuthContext";
import useConversation from "@/store/useConversation";
import { useEffect } from "react";

const useListenDelete = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("delMsgs", (newMessage) => {
      const result = updateMessageById(
        messages,
        newMessage?.message_id,
        "This message has been deleted"
      );

      setMessages([...result]);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
};

export default useListenDelete;

export function updateMessageById(array, id, newMessage) {
  // console.log("Input array:", array); // Debug: Log the input array
  // console.log("Searching for _id:", id); // Debug: Log the id being searched for

  // Find the index of the object with the matching _id
  const index = array.findIndex((obj) => obj._id === id);

  // console.log("Found index:", index); // Debug: Log the index found

  // If the object is found, update the message
  if (index !== -1) {
    // Clone the array to avoid mutating the original state
    const updatedArray = [...array];
    // Update the message property of the object at the found index
    updatedArray[index] = { ...updatedArray[index], message: newMessage };

    // console.log("Updated array:", updatedArray); // Debug: Log the updated array

    // Return the updated array
    return updatedArray;
  } else {
    // console.error("ID not found in array"); // Debug: Log an error if ID is not found
    // If the object is not found, return the original array
    return array;
  }
}
