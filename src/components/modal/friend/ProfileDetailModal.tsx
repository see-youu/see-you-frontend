import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalWrapper from "../ModalWrapper";
import { faCircleMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { FriendType } from "@/types/friendType";
import emptyImg from "@/../public/emptyImg.png";

interface ProfileDatailProps {
  target: FriendType;
  onClose: () => void;
  onDeleteFriend?: () => void;
}

const ProfileDetailModal: React.FC<ProfileDatailProps> = ({
  target,
  onClose,
  onDeleteFriend = () => {},
}) => {
  return (
    <ModalWrapper backgroundColor="transparent">
      <div
        className="flex items-center justify-center w-full h-full"
        onClick={onClose}
      >
        <div
          className="relative flex flex-col items-center gap-4 px-20 py-8 border border-gray-200 border-solid rounded-md bg-gray-50"
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute text-lg cursor-pointer right-3 top-3"
            onClick={onClose}
          />
          <Image
            src={target.profileImageUrl || emptyImg}
            width={4 * 16} // 4rem
            height={4 * 16} // 4rem
            alt="profile"
            className="block object-cover w-16 h-16 border border-gray-400 border-solid rounded-full y"
          />
          <div className="flex items-center gap-2">
            <p>{target.name}</p>
            <FontAwesomeIcon
              icon={faCircleMinus}
              className="text-sm text-red-500 cursor-pointer"
              onClick={onDeleteFriend}
            />
          </div>

          <button className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-200 rounded-md">
            <span>공개된 약속</span>
            <span className="text-xs text-gray-500">2</span>
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProfileDetailModal;
