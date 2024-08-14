import { FriendType } from "@/types/friendType";
import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  profileDetailOpen: boolean;
  confirmationModalOpen: boolean;
  friendRequestModalOpen: boolean;
  selectedProfile: FriendType;
  confirmMessage: string;
}

const initialState = {
  profileDetailOpen: false,
  confirmationModalOpen: false,
  friendRequestModalOpen: false,
  selectedProfile: null,
  confirmMessage: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },
    openProfileDetail: (state, action) => {
      state.profileDetailOpen = true;
      state.selectedProfile = action.payload;
    },
    closeProfileDetail: (state) => {
      state.profileDetailOpen = false;
      state.selectedProfile = null;
    },
    openConfirmationModal: (state, action) => {
      state.confirmationModalOpen = true;
      state.profileDetailOpen = false;
      state.friendRequestModalOpen = false;
      state.confirmMessage = action.payload;
    },
    closeConfirmationModal: (state) => {
      state.confirmationModalOpen = false;
      state.friendRequestModalOpen = false;
      state.confirmMessage = "";
    },
    openFriendRequestModal: (state, action) => {
      state.friendRequestModalOpen = true;
      state.selectedProfile = action.payload;
    },
    closeFriendRequestModal: (state) => {
      state.friendRequestModalOpen = false;
      state.selectedProfile = null;
    },
    closeAllModal: (state) => {
      state.profileDetailOpen = false;
      state.confirmationModalOpen = false;
      state.friendRequestModalOpen = false;
    },
  },
});

export const {
  setSelectedProfile,
  openProfileDetail,
  closeProfileDetail,
  openConfirmationModal,
  closeConfirmationModal,
  openFriendRequestModal,
  closeFriendRequestModal,
  closeAllModal,
} = modalSlice.actions;

export default modalSlice.reducer;
