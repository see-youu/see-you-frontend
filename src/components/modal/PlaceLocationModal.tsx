"use client";
import React from "react";
import ModalWrapper from "./ModalWrapper";
import NaverMap from "../map/NaverMap";
import MenuHeader from "../menubar/MenuHeader";
import { usePlace } from "@/context/schedule/PlaceProvider";

interface InsertModalProps {
  handleClose: () => void;
  searchKeyword: string;
}

const PlaceLocationModal: React.FC<InsertModalProps> = ({
  handleClose,
  searchKeyword,
}) => {
  const handleBack = () => {
    handleClose();
  };
  const { place } = usePlace();
  return (
    <ModalWrapper>
      <MenuHeader title={searchKeyword} handleBack={handleBack} />
      <div
        className="relative top-0 left-0 flex flex-col items-center gap-2 bg-white"
        onClick={(e) => e.stopPropagation()}
        style={{ height: `calc(100vh - var(--menubar-height))` }}
      >
        <NaverMap lat={place.latitude} lng={place.longitude} />
      </div>
    </ModalWrapper>
  );
};

export default PlaceLocationModal;
