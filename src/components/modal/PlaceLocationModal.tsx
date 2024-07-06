"use client";
import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import NaverMap from "../map/NaverMap";
import MenuHeader from "../menubar/MenuHeader";
import { usePlace } from "@/context/schedule/PlaceProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useSchedule } from "@/context/schedule/ScheduleProvider";

interface InsertModalProps {
  handleClose: () => void;
  searchKeyword: string;
  handleAddBtn: () => void;
}

const PlaceLocationModal: React.FC<InsertModalProps> = ({
  handleClose,
  searchKeyword,
  handleAddBtn,
}) => {
  const { place } = usePlace();
  const { setScheduleInput } = useSchedule();
  const [showDetail, setShowDetail] = useState(true);

  const handleBack = () => {
    handleClose();
  };
  const handleAddPlace = () => {
    setScheduleInput((current) => ({
      ...current,
      locations: [...current.locations, place],
    }));
    handleAddBtn();
  };
  return (
    <ModalWrapper>
      <MenuHeader title={searchKeyword} handleBack={handleBack} />
      <div
        className="relative top-0 left-0 flex flex-col items-center gap-2 bg-white"
        onClick={(e) => e.stopPropagation()}
        style={{ height: `calc(100vh - var(--menubar-height))` }}
      >
        <NaverMap lat={place.latitude} lng={place.longitude} />
      </div>
      <article className="absolute bottom-0 left-0 w-full py-6 bg-white rounded-lg px-9 shadow-top">
        <div
          className="flex justify-center mb-6 text-lg text-gray-500 cursor-pointer"
          onClick={() => setShowDetail((current) => !current)}
        >
          {showDetail ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </div>
        {showDetail && (
          <div className="flex flex-col w-full gap-2 mb-7">
            <div className="flex items-center gap-2">
              <p className="text-lg">{place.name}</p>
              <p className="text-sm text-gray-500">{place.category}</p>
            </div>
            <address>{place.address}</address>
            <div className="flex items-center gap-2">
              <p>영업중</p>
              <p>4.8</p>
              <p>리뷰 999+</p>
            </div>
            <div>메뉴...</div>
            <div className="flex justify-end">
              <button
                className="px-6 py-2 rounded-xl bg-customYellow"
                onClick={handleAddPlace}
              >
                추가
              </button>
            </div>
          </div>
        )}
      </article>
    </ModalWrapper>
  );
};

export default PlaceLocationModal;
