import React from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 flex flex-col w-full h-screen overflow-hidden bg-white">
      {children}
    </div>
  );
};

export default ModalWrapper;
