import React from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  backgroundColor,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 z-30 flex flex-col h-screen overflow-x-hidden overflow-y-auto ${
        backgroundColor ? backgroundColor : "bg-white"
      } modal-width`}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
