import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);

  const { token, user } = useAuthContext();

  //   console.log(user);

  useEffect(() => {
    if (token) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: user?._id ? user?._id : "",
        },
      });

      // console.log("sock connecting...", socket);
      setSocket(socket);

      socket.on("all", (msg) => {});

      socket.on("onlineUsers", (user) => {
        setOnlineUser(user);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [token, user]);

  // console.log("socket", socket);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
