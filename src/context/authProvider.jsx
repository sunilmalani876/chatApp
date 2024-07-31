import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("accessToken") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // if (!user) {
    const fetCurrentUser = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL1}/auth/crnt-usr`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      // console.log(result);

      if (result.success) {
        setUser(result.data);
      }
    };

    fetCurrentUser();
    // }
  }, [token]);

  // const getConversations = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/all`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!res.ok) {
  //       handleHTTPError(res.status, res.statusText);
  //       return;
  //     }

  //     const json = await res.json();

  //     if (json.success) {
  //       setConversations(json);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <AuthContext.Provider value={{ token, user, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
