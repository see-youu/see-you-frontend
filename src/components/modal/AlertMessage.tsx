"use client";
import { useEffect, useState } from "react";

interface AlertMessageProps {
  message: string;
  setClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message = "완료되었습니다.",
  setClose,
}) => {
  const [messageVisible, setMessageVisible] = useState(true);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setMessageVisible(false);
      setTimeout(() => {
        setClose(); // 애니메이션이 완료된 후에 컴포넌트를 닫도록
      }, 400); // 페이드 아웃 애니메이션의 지속 시간
    }, 1500);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      className={`text-sm fixed px-4 py-1 text-black bg-gray-200 border border-gray-200 border-solid rounded-xl  ${
        messageVisible ? "animate-fadeInDown" : "animate-fadeOut"
      }`}
      style={{ bottom: "calc(var(--menubar-height) + 2rem)" }}
    >
      {message}
    </div>
  );
};

export default AlertMessage;
