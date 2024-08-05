import { FriendType } from "@/types/friendType";
import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  profileDetailOpen: boolean;
  confirmationModalOpen: boolean;
  selectedProfile: FriendType | null;
  confirmMessage: string;
}

const initialState = {
  profileDetailOpen: false,
  confirmationModalOpen: false,
  selectedProfile: null,
  confirmMessage: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
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
      state.confirmMessage = action.payload;
    },
    closeConfirmationModal: (state) => {
      state.confirmationModalOpen = false;
      state.confirmMessage = "";
    },
    closeAllModal: (state) => {
      state.profileDetailOpen = false;
      state.confirmationModalOpen = false;
    },
  },
});

export const {
  openProfileDetail,
  closeProfileDetail,
  openConfirmationModal,
  closeConfirmationModal,
  closeAllModal,
} = modalSlice.actions;

export default modalSlice.reducer;
