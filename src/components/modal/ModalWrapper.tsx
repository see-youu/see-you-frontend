import React from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return (
    <div className="fixed top-0 flex flex-col h-screen overflow-hidden bg-white modal-width">
      {children}
    </div>
  );
};

export default ModalWrapper;
