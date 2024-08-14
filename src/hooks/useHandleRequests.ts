import {
  acceptFriendRequest,
  fetchFriendsRequestList,
  rejectFriendRequest,
} from "@/api/friends";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  closeAllModal,
  closeConfirmationModal,
  ModalState,
  openConfirmationModal,
  openFriendRequestModal,
  setSelectedProfile,
} from "@/store/modalSlice";
import { useAlert } from "@/context/AlertProvider";
import { useFriendRequest } from "@/context/friend/RequestProvider";
import { useConfirm } from "@/context/ConfirmationProvider";
import { FriendType } from "@/types/friendType";

function useHandleRequests() {
  const dispatch = useDispatch();
  const { selectedProfile } = useSelector(
    (state: RootState) => state.modal as ModalState
  );
  const { setConfirmCancelFunction, setConfirmFunction } = useConfirm();
  const { setAlert } = useAlert();
  const { setFriendRequests } = useFriendRequest();

  const handleAcceptRequest = async () => {
    if (selectedProfile?.memberId) {
      const data = await acceptFriendRequest(selectedProfile.memberId);
      if (data) {
        setAlert("친구 요청을 수락하였습니다.");
        dispatch(closeAllModal());
      } else setAlert("오류가 발생했습니다.");
      const request = await fetchFriendsRequestList();
      setFriendRequests(request);
    } else {
      setAlert("선택된 프로필이 없습니다.");
      dispatch(closeAllModal());
    }
  };

  const handleRejectRequest = async (id: number) => {
    console.log(selectedProfile);
    const memberId = !!selectedProfile ? selectedProfile.memberId : id;
    if (memberId) {
      const data = await rejectFriendRequest(memberId);
      if (data) {
        setAlert("친구 요청을 거절하였습니다.");
        dispatch(closeAllModal());
      } else setAlert("오류가 발생했습니다.");
      const request = await fetchFriendsRequestList();
      setFriendRequests(request);
    } else {
      setAlert("선택된 프로필이 없습니다.");
      dispatch(closeAllModal());
    }
  };

  const handleAccept = (member?: FriendType) => {
    const profile = selectedProfile || member;
    console.log(selectedProfile, member, profile);
    if (profile) {
      console.log("here");
      dispatch(
        openConfirmationModal(`${profile.name} 님을 친구 요청을 수락합니다.`)
      );
    }
    setConfirmCancelFunction(() => () => {
      if (selectedProfile) dispatch(openFriendRequestModal(selectedProfile));
      else closeConfirmationModal();
    });
    setConfirmFunction(() => () => {
      if (selectedProfile === null) dispatch(setSelectedProfile(member));
      handleAcceptRequest();
    });
  };

  const handleReject = (member?: FriendType) => {
    const profile = selectedProfile || member;
    if (profile)
      dispatch(
        openConfirmationModal(`${profile.name} 님을 친구 요청을 거절합니다.`)
      );
    setConfirmCancelFunction(() => () => {
      if (selectedProfile) dispatch(openFriendRequestModal(selectedProfile));
      else closeConfirmationModal();
    });
    setConfirmFunction(() => () => {
      handleRejectRequest(profile.memberId);
    });
  };

  return {
    handleAccept,
    handleReject,
  };
}

export default useHandleRequests;
