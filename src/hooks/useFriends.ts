import { useState, useEffect } from "react";
import { fetchFriendList } from "@/api/friends";
import { FriendType } from "@/types/friendType";

function useFriends() {
  const [friends, setFriends] = useState<FriendType[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const friendsData = await fetchFriendList();
      setFriends(friendsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { friends, isLoading };
}

export default useFriends;
