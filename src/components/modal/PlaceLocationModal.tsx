"use client";
import React from "react";
import ModalWrapper from "./ModalWrapper";
import NaverMap from "../map/NaverMap";
import MenuHeader from "../menubar/MenuHeader";
import { NaverLocationType } from "@/types/naverMapTypes";

interface InsertModalProps {
  handleClose: () => void;
  location: NaverLocationType;
  searchKeyword: string;
}

const PlaceLocationModal: React.FC<InsertModalProps> = ({
  handleClose,
  location,
  searchKeyword,
}) => {
  const handleBack = () => {
    handleClose();
  };

  return (
    <ModalWrapper>
      <MenuHeader title={searchKeyword} handleBack={handleBack} />
      <div
        className="relative flex flex-col items-center gap-2 bg-white"
        onClick={(e) => e.stopPropagation()}
        style={{ height: `calc(100vh - var(--menubar-height))` }}
      >
        <NaverMap lat={location.lat} lng={location.lng} />
      </div>
    </ModalWrapper>
  );
};

export default PlaceLocationModal;
