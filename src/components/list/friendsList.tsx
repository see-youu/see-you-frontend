import Image from "next/image";
import emptyImg from "@/../public/emptyImg.png";
import { FriendType } from "@/types/friendType";

interface FriendListProps {
  friends: FriendType[];
  onFriendClick: (friend: FriendType) => void;
}

const FriendList: React.FC<FriendListProps> = ({ friends, onFriendClick }) => {
  if (!friends) return null;
  return (
    <>
      {friends.map((friend) => (
        <div
          key={friend.memberId}
          className="flex items-center gap-5 my-3 cursor-pointer"
          onClick={() => onFriendClick(friend)}
        >
          <Image
            src={friend.profileImageUrl || emptyImg}
            width={3 * 16} // 3rem
            height={3 * 16} // 3rem
            alt="profile"
            className="block object-cover w-12 h-12 border border-gray-400 border-solid rounded-full"
          />
          <p>{friend.name}</p>
        </div>
      ))}
    </>
  );
};

export default FriendList;
