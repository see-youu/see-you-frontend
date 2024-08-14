"use client";
import React from "react";
import { useSelector } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";
import ProfileDetailModal from "./friend/ProfileDetailModal";
import { ModalState } from "@/store/modalSlice";
import { RootState } from "@/store/store";

function ModalsContainer() {
  const { profileDetailOpen, selectedProfile, confirmationModalOpen } =
    useSelector((state: RootState) => state.modal as ModalState);

  return (
    <>
      {profileDetailOpen && <ProfileDetailModal />}
      {confirmationModalOpen && <ConfirmationModal />}
    </>
  );
}

export default ModalsContainer;
