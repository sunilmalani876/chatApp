import { useAuthContext } from "@/context/useAuthContext";
import { handleHTTPError } from "@/lib/utils";
import useConversation from "@/store/useConversation";
import React, { useState } from "react";

const useUnblocked = () => {
  const [Loading, setLoading] = useState(false);
  const { selectedConversation } = useConversation();
  const { token, setUser, user } = useAuthContext();

  const blockUser = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/chat/un-blc-usr/${
          selectedConversation?._id
        }`,
        {
          method: "PATCH",
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

      const result = await res.json();

      const blockedUser = user?.isBlockedByUser?.filter(
        (ele) => ele?.userRef !== selectedConversation?._id
      );

      // console.log("blockedUser", blockedUser);

      if (result.success) {
        setUser((pre) => {
          return {
            ...pre,
            isBlockedByUser: blockedUser,
          };
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { blockUser, Loading };
};

export default useUnblocked;
