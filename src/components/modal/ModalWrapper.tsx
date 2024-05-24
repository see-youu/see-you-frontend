import React from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
}
const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen overflow-hidden bg-gray-600">
      {children}
    </div>
  );
};

export default ModalWrapper;
