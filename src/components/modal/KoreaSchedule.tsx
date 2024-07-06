"use client";
import React from "react";
import InsertLocationModal from "@/components/modal/InsertLocationModal";
import TimeSelect from "@/components/select/TimeSelect";
import DateRangeSelect from "@/components/select/DateRangeSelect";
import { useState } from "react";
import { useSchedule } from "@/context/schedule/ScheduleProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faXmark } from "@fortawesome/free-solid-svg-icons";
import { PlaceType } from "@/types/scheduleType";

export const KoreaSchedule = () => {
  const { scheduleInput, setScheduleInput } = useSchedule();

  const dateButton = [{ name: "미정" }, { name: "날짜 선택" }];
  const timeButton = [{ name: "미정" }, { name: "시간 선택" }];
  const [mapOpen, setMapOpen] = useState(false);
  const handleModalClose = () => {
    setMapOpen(false);
  };

  const handleDeletePlace = (indexToRemove: number) => {
    setScheduleInput((current) => ({
      ...current,
      locations: current.locations.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  return (
    <main
      className="flex flex-col items-center gap-4 px-8 py-4"
      style={{ height: `calc(100vh - var(--menubar-height))` }}
    >
      <p className="text-sm text-center text-customBrown">
        나중에 수정할 수 있어요!
      </p>
      <section className="relative w-full">
        <input
          type="text"
          placeholder="새 약속 이름을 입력하세요."
          value={scheduleInput.name}
          onChange={(e) =>
            setScheduleInput((prev) => ({ ...prev, name: e.target.value }))
          }
          maxLength={30}
          className="w-full p-2 border-b border-solid border-b-gray-300 pr-11"
        />
        <p className="absolute text-sm text-gray-400 right-1 bottom-2">
          {scheduleInput.name.length}/30
        </p>
      </section>
      <section className="flex flex-col w-full gap-2">
        <p>약속 날짜</p>
        <div className="flex justify-between w-full gap-2">
          {dateButton.map((item, idx) => (
            <button
              key={idx}
              className={`w-1/2 py-1.5 text-sm border border-solid border-customBrown rounded-xl cursor-pointer ${
                scheduleInput.date === item.name ? "bg-customYellow" : "white"
              }`}
              onClick={() => {
                setScheduleInput((prev) => ({
                  ...prev,
                  date: item.name,
                  days: "1",
                }));
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        {scheduleInput.date !== "미정" && <DateRangeSelect />}
      </section>
      <section className="flex flex-col w-full gap-2">
        <p>약속 시간</p>
        <div className="flex justify-between w-full gap-2">
          {timeButton.map((item, idx) => (
            <button
              key={idx}
              className={`w-1/2 py-1.5 text-sm border border-solid border-customBrown rounded-xl cursor-pointer ${
                scheduleInput.time === item.name ? "bg-customYellow" : "white"
              }`}
              onClick={() => {
                setScheduleInput((prev) => ({
                  ...prev,
                  time: item.name,
                  days: "1",
                }));
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        {scheduleInput.time !== "미정" && <TimeSelect />}
      </section>
      <section className="flex flex-col w-full gap-2">
        <p>약속 장소</p>
        <div className="flex justify-between w-full gap-2">
          <button
            className={`w-1/3 px-1 py-1.5 text-sm border border-solid border-customBrown rounded-xl cursor-pointer
                bg-customYellow`}
            onClick={() => setMapOpen(true)}
          >
            장소 추가
          </button>
        </div>
        <div className="flex flex-col gap-3 my-3">
          {scheduleInput.locations.map((location, idx) => (
            <div key={idx} className="flex items-center">
              <p className="flex items-center justify-center w-6 h-6 text-xs border border-black border-solid rounded-full bg-customYellow">
                {idx + 1}
              </p>
              <div className="w-5 bg-black h-px-1"></div>
              <div className="flex items-center gap-5 px-5 py-3 border border-black border-solid rounded-xl">
                <FontAwesomeIcon icon={faLocationDot} />
                <div className="flex flex-col gap-1">
                  <p className="text-sm tracking-wider">{location.name}</p>
                  <p className="text-xs tracking-wide text-gray-500">
                    {location.address.split(" ").slice(0, 2).join(" ")}
                  </p>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faXmark}
                className="ml-5 text-gray-500 cursor-pointer"
                onClick={() => handleDeletePlace(idx)}
              />
            </div>
          ))}
        </div>
      </section>
      {mapOpen && <InsertLocationModal handleClose={handleModalClose} />}
    </main>
  );
};

export default KoreaSchedule;
