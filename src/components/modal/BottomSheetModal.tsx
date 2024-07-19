"use client";
import React, { useEffect, useRef, useState } from "react";

interface BottomSheetProps {
  handleCloseModal: () => void;
  children: React.ReactNode;
}
const BottomSheetModal: React.FC<BottomSheetProps> = ({
  handleCloseModal,
  children,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [modalHeight, setModalHeight] = useState<number>(0); // 초기 모달 높이 설정
  const [initialModalHeight, setInitialModalHeight] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const dragSensitivity = 0.7;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    if (modalRef.current) {
      modalRef.current.style.overflow = "hidden"; // 드래그 중 스크롤 방지
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart !== null) {
      const currentTouch = e.targetTouches[0].clientY;
      const difference = (currentTouch - touchStart) * dragSensitivity;
      setModalHeight((prevHeight) => Math.max(100, prevHeight - difference));
      setTouchStart(currentTouch); // 드래그에 따라 시작점 업데이트
    }
  };

  const handleTouchEnd = () => {
    // 터치가 끝날 때, 모달의 높이를 재설정
    if (modalRef.current) {
      const threshold = initialModalHeight / 2;
      if (touchStart) {
        const delta = initialModalHeight - modalHeight;
        if (delta < 0) setModalHeight(initialModalHeight);
        else if (delta > threshold) {
          // 드래그 거리가 모달 높이의 반을 넘으면 모달 닫기
          handleCloseModal();
        } else {
          // 그렇지 않다면 원래 높이로 복귀
          setModalHeight(initialModalHeight);
        }
      }
      setTouchStart(null);
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      setModalHeight(modalRef.current.clientHeight);
      setInitialModalHeight(modalRef.current.clientHeight);
    }
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-30 flex items-end h-screen overflow-hidden overflow-x-hidden bg-customOpacityGray modal-width"
      onClick={handleCloseModal}
    >
      <div
        className="w-full px-8 py-6 bg-white rounded-t-lg"
        style={{ height: modalHeight !== 0 ? `${modalHeight}px` : "auto" }}
        ref={modalRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-24 h-1 mx-auto mb-3 bg-gray-300 rounded-lg"></div>
        {children}
      </div>
    </div>
  );
};

export default BottomSheetModal;
