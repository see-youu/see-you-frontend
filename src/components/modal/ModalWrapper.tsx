import React from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
  handleClose: React.MouseEventHandler<HTMLDivElement>;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  handleClose,
}) => {
  return (
    <div
      className="absolute top-0 left-0 flex items-center justify-center w-full h-screen overflow-hidden bg-customOpacityGray"
      onClick={handleClose}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
