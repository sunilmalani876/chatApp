import { useAuthContext } from "@/context/useAuthContext";
import { handleGenericError } from "@/lib/utils";

export const submitMessage = async (message, id) => {
  const { token } = useAuthContext();

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/chat/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    });

    const result = res.json();

    console.log("send message", result);
  } catch (error) {
    handleGenericError(error);
  }
};
