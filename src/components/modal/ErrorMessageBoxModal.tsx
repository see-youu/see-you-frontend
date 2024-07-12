import React from "react";

interface ErrorMessageProps {
  message: string;
  visible: boolean;
}

const ErrorMessageBoxModal: React.FC<ErrorMessageProps> = ({
  message = "오류가 발생했습니다.",
  visible,
}) => {
  return (
    <div
      className={`fixed px-4 py-1 text-red-600 bg-white border-2 border-red-600 border-solid top-menuber rounded-xl ${
        visible ? "animate-fadeInUp" : "animate-fadeOutDown"
      }`}
    >
      {message}
    </div>
  );
};

export default ErrorMessageBoxModal;
