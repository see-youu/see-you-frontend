import React from "react";
import ModalWrapper from "./ModalWrapper";
import NaverMap from "../map/NaverMap";

interface InsertModalProps {
  handleClose: React.MouseEventHandler<HTMLDivElement>;
}
const InsertLocationModal: React.FC<InsertModalProps> = ({ handleClose }) => {
  return (
    <ModalWrapper handleClose={handleClose}>
      <div
        className="flex flex-col items-center gap-2 p-3 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <span>장소 추가하기</span>
        <input
          type="text"
          className="h-8 border border-black border-solid rounded-md"
        />
        <NaverMap />
      </div>
    </ModalWrapper>
  );
};

export default InsertLocationModal;
