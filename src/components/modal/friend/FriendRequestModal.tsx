import React from "react";
import ModalWrapper from "../ModalWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import emptyImg from "@/../public/emptyImg.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  closeAllModal,
  closeFriendRequestModal,
  ModalState,
  openConfirmationModal,
  openFriendRequestModal,
} from "@/store/modalSlice";
import { useAlert } from "@/context/AlertProvider";
import {
  acceptFriendRequest,
  fetchFriendsRequestList,
  rejectFriendRequest,
} from "@/api/friends";
import { useConfirm } from "@/context/ConfirmationProvider";
import { useFriendRequest } from "@/context/friend/RequestProvider";
import useFriendRequests from "@/hooks/useFriendRequest";
import useHandleRequests from "@/hooks/useHandleRequests";

const FriendRequestModal = () => {
  const dispatch = useDispatch();
  const { selectedProfile } = useSelector(
    (state: RootState) => state.modal as ModalState
  );
  const { setConfirmCancelFunction, setConfirmFunction } = useConfirm();
  const { setAlert } = useAlert();
  const { setFriendRequests } = useFriendRequest();
  const { handleAccept, handleReject } = useHandleRequests();

  const handleCloseModal = () => {
    dispatch(closeFriendRequestModal());
  };

  const fetchRequests = async () => {
    const data = await fetchFriendsRequestList();
    setFriendRequests(data);
  };

  return (
    <ModalWrapper backgroundColor="transparent">
      <div
        className="flex items-center justify-center w-full h-full"
        onClick={handleCloseModal}
      >
        <div
          className="relative flex flex-col items-center gap-4 px-20 py-8 border border-gray-200 border-solid rounded-md bg-gray-50"
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute text-lg cursor-pointer right-3 top-3"
            onClick={handleCloseModal}
          />
          {!!selectedProfile ? (
            <>
              <Image
                src={selectedProfile.profileImageUrl || emptyImg}
                width={4 * 16} // 3rem
                height={4 * 16} // 3rem
                alt="profile"
                className="block object-cover w-16 h-16 border border-gray-400 border-solid rounded-full y"
              />
              <p>{selectedProfile.name}</p>
              <div className="flex justify-center w-full gap-4 text-sm">
                <button
                  className="px-4 py-2 bg-white border border-gray-200 border-solid rounded-md"
                  onClick={handleReject}
                >
                  거절
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-customYellow"
                  onClick={handleAccept}
                >
                  수락
                </button>
              </div>
            </>
          ) : (
            <p>요청이 없습니다.</p>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default FriendRequestModal;
