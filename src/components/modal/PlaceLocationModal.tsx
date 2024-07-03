"use client";
import React from "react";
import ModalWrapper from "./ModalWrapper";
import NaverMap from "../map/NaverMap";
import MenuHeader from "../menubar/MenuHeader";
import { useLocation } from "@/context/schedule/LocationProvider";

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
  const { location } = useLocation();
  return (
    <ModalWrapper>
      <MenuHeader title={searchKeyword} handleBack={handleBack} />
      <div
        className="relative flex flex-col items-center gap-2 bg-white"
        onClick={(e) => e.stopPropagation()}
        style={{ height: `calc(100vh - var(--menubar-height))` }}
      >
        <NaverMap lat={location.latitude} lng={location.longitude} />
      </div>
    </ModalWrapper>
  );
};

export default PlaceLocationModal;
