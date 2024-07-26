import { useAuthContext } from "@/context/useAuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState(null);
  const { token } = useAuthContext();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          handleHTTPError(res.status, res.statusText);
          return;
        }

        const json = await res.json();

        if (json.success) {
          setConversations(json);
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
