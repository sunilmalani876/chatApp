import { useAuthContext } from "@/context/useAuthContext";
import { handleGenericError, handleHTTPError } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useFetcher = (url) => {
  const { token } = useAuthContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
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

        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        handleGenericError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
