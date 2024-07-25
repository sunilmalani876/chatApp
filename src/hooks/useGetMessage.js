import { useAuthContext } from "@/context/useAuthContext";
import { handleGenericError, handleHTTPError } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useGetMessage = (roomId) => {
  // const {roomId} = useParams();
  const [data, setData] = useState(null);
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // console.log(roomId);

  useEffect(() => {
    const geNewtMessage = async () => {
      // console.log("roomId", roomId);
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/chat/${roomId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          handleHTTPError(res.status, res.statusText);
          return;
        }

        const json = await res.json();

        setData(json);
        setLoading(false);

        // console.log("getMessage", json);
      } catch (error) {
        setError(error);
        setLoading(false);
        handleGenericError(error);
      } finally {
        setLoading(false);
      }
    };

    geNewtMessage();
  }, [roomId]);

  return { data, loading, error };
};
