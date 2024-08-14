import { useState, useEffect } from "react";
import { fetchFriendsRequestList } from "@/api/friends";

function useFriendRequests() {
  const [friendRequests, setFriendRequest] = useState(null);
  const [requestCount, setRequestCount] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const friendsData = await fetchFriendsRequestList();
      setFriendRequest(friendsData);
      setRequestCount(friendsData.length);
      setLoading(false);
    }
    fetchData();
  }, []);

  return {
    friendRequests,
    requestCount,
    isLoading,
  };
}

export default useFriendRequests;
