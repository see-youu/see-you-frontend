import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalWrapper from "../ModalWrapper";
import { faCircleMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import emptyImg from "@/../public/emptyImg.png";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAllModal,
  closeProfileDetail,
  ModalState,
  openConfirmationModal,
  openProfileDetail,
} from "@/store/modalSlice";
import { RootState } from "@/store/store";
import { useConfirm } from "@/context/ConfirmationProvider";
import { useAlert } from "@/context/AlertProvider";

const ProfileDetailModal: React.FC = () => {
  const { setAlert } = useAlert();
  const dispatch = useDispatch();
  const { selectedProfile } = useSelector(
    (state: RootState) => state.modal as ModalState
  );
  const { setConfirmCancelFunction, setConfirmFunction } = useConfirm();

  const handleCloseProfileDetail = () => {
    dispatch(closeProfileDetail());
  };

  const handleDeleteFriend = () => {
    const data = true;
    if (data) {
      setAlert("친구 목록에서 삭제되었습니다.");
      dispatch(closeAllModal());
    } else setAlert("오류가 발생했습니다.");
  };

  const handleDeleteConfirm = () => {
    if (selectedProfile) {
      dispatch(
        openConfirmationModal(
          `${selectedProfile.name} 님을 친구 목록에서 삭제합니다.`
        )
      );
    }
    setConfirmCancelFunction(() => () => {
      dispatch(openProfileDetail(selectedProfile));
    });
    setConfirmFunction(() => () => {
      handleDeleteFriend();
    });
  };

  return (
    <ModalWrapper backgroundColor="transparent">
      <div
        className="flex items-center justify-center w-full h-full"
        onClick={handleCloseProfileDetail}
      >
        <div
          className="relative flex flex-col items-center gap-4 px-20 py-8 border border-gray-200 border-solid rounded-md bg-gray-50"
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute text-lg cursor-pointer right-3 top-3"
            onClick={handleCloseProfileDetail}
          />
          {!!selectedProfile ? (
            <>
              <Image
                src={selectedProfile.profileImageUrl || emptyImg}
                width={4 * 16} // 4rem
                height={4 * 16} // 4rem
                alt="profile"
                className="block object-cover w-16 h-16 border border-gray-400 border-solid rounded-full y"
              />
              <div className="flex items-center gap-2">
                <p>{selectedProfile.name}</p>
                <FontAwesomeIcon
                  icon={faCircleMinus}
                  className="text-sm text-red-500 cursor-pointer"
                  onClick={handleDeleteConfirm}
                />
              </div>

              <button className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-200 rounded-md">
                <span>공개된 약속</span>
                <span className="text-xs text-gray-500">2</span>
              </button>
            </>
          ) : (
            <p>프로필이 없습니다.</p>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProfileDetailModal;
