"use client";
import MenuHeader from "@/components/menubar/MenuHeader";
import TimeSelect from "@/components/select/\bTimeSelect";
import DateRangeSelect from "@/components/select/DateRangeSelect";
import DaySelect from "@/components/select/DaySelect";
import { useState } from "react";

export default function () {
  const [scheduleInput, setScheduleInput] = useState<ScheduleProps>({
    name: "",
    date: "미정",
    startDate: null,
    endDate: null,
    days: "1",
    time: "미정",
    startTime: null,
    endTime: null,
  });

  const [date, setDate] = useState(0);

  const dateButton = [{ name: "미정" }, { name: "날짜 선택" }];
  const timeButton = [{ name: "미정" }, { name: "시간 선택" }];

  // const DaySelector = () => {
  //   const days = [];
  //   for (let i = 1; i <= 10; i++) {
  //     days.push(
  //       <li
  //         onClick={() => {
  //           setScheduleInput((current) => ({ ...current, days: `${i}` }));
  //         }}
  //       >
  //         {i}일
  //       </li>
  //     );
  //   }

  //   return (
  //     <>
  //       <div className="relative w-full px-3 py-1 text-sm text-center border border-solid cursor-pointer border-customBrown rounded-xl">
  //         <span>{scheduleInput.days}일</span>
  //         <FontAwesomeIcon
  //           icon={faChevronDown}
  //           className="absolute right-5 top-1.5 cursor-pointer"
  //         />
  //       </div>
  //       <ul>{days}</ul>
  //     </>
  //   );
  // };

  return (
    <div>
      <MenuHeader title="새 약속 만들기" />
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
          {scheduleInput.date === "미정" ? (
            <DaySelect
              scheduleInput={scheduleInput}
              setScheduleInput={setScheduleInput}
            />
          ) : (
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
      </main>
    </div>
  );
}
