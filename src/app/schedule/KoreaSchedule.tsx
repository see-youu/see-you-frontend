"use client";
import React from "react";
import InsertLocationModal from "@/components/modal/InsertLocationModal";
import TimeSelect from "@/components/select/TimeSelect";
import DateRangeSelect from "@/components/select/DateRangeSelect";
import DaySelect from "@/components/select/DaySelect";
import { useState } from "react";

const KoreaSchedule = () => {
  const [scheduleInput, setScheduleInput] = useState<ScheduleProps>({
    name: "",
    date: "미정",
    startDate: null,
    endDate: null,
    days: "1",
    time: "미정",
    startTime: null,
  });

  const dateButton = [{ name: "미정" }, { name: "날짜 선택" }];
  const timeButton = [{ name: "미정" }, { name: "시간 선택" }];
  const [mapOpen, setMapOpen] = useState(false);
  const handleModalClose = () => {
    setMapOpen(false);
  };
  return (
    <main className="flex flex-col items-center gap-4 mx-8 my-4">
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
              className={`w-1/2 py-1 text-sm border border-solid border-customBrown rounded-xl cursor-pointer ${
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
        {scheduleInput.date !== "미정" && (
          <DateRangeSelect
            scheduleInput={scheduleInput}
            setScheduleInput={setScheduleInput}
          />
        )}
      </section>
      <section className="flex flex-col w-full gap-2">
        <p>약속 시간</p>
        <div className="flex justify-between w-full gap-2">
          {timeButton.map((item, idx) => (
            <button
              key={idx}
              className={`w-1/2 py-1 text-sm border border-solid border-customBrown rounded-xl cursor-pointer ${
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
        {scheduleInput.time !== "미정" && (
          <TimeSelect
            scheduleInput={scheduleInput}
            setScheduleInput={setScheduleInput}
          />
        )}
      </section>
      <section className="flex flex-col w-full gap-2">
        <p>약속 장소</p>
        <div className="flex justify-between w-full gap-2">
          <button
            className={`w-1/3 py-1 text-sm border border-solid border-customBrown rounded-xl cursor-pointer
                bg-customYellow`}
            onClick={() => setMapOpen(true)}
          >
            장소 추가하기
          </button>
        </div>
        {mapOpen && <InsertLocationModal handleClose={handleModalClose} />}
      </section>
    </main>
  );
};

export default KoreaSchedule;
