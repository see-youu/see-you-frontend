import React, { createContext, useContext, useState, ReactNode } from "react";

interface RequestType {
  requestId: number;
  sender: {
    memberId: number;
    name: string;
    profileImageUrl: string | null;
  };
  createdDate: Date;
}

interface FriendRequestContextType {
  friendRequests: RequestType[];
  setFriendRequests: React.Dispatch<React.SetStateAction<RequestType[]>>;
}

const FriendRequestContext = createContext<
  FriendRequestContextType | undefined
>(undefined);

export function useFriendRequest() {
  const context = useContext(FriendRequestContext);
  if (context === undefined) {
    throw new Error("useFriendRequest must be used within a RequestProvider");
  }
  return context;
}
interface FriendRequestProviderProps {
  children: ReactNode;
}

export const FriendRequestProvider: React.FunctionComponent<
  FriendRequestProviderProps
> = ({ children }) => {
  const [friendRequests, setFriendRequests] = useState<RequestType[]>([]);

  return (
    <FriendRequestContext.Provider
      value={{ friendRequests, setFriendRequests }}
    >
      {children}
    </FriendRequestContext.Provider>
  );
};
