import React, { useEffect, useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DaySelectProps {
  scheduleInput: ScheduleProps;
  setScheduleInput: React.Dispatch<React.SetStateAction<ScheduleProps>>;
}

const DaySelect: React.FC<DaySelectProps> = ({
  scheduleInput,
  setScheduleInput,
}) => {
  const [listOpen, setListOpen] = useState<boolean>(false);
  const days = [];
  for (let i = 1; i <= 10; i++) {
    days.push(
      <li
        onClick={() => {
          setScheduleInput((current) => ({ ...current, days: `${i}` }));
          setListOpen(false);
        }}
        className={`py-1 border-b border-gray-300 border-solid hover:bg-gray-100 ${
          scheduleInput.days === String(i) ? `bg-customYellow` : "bg-white"
        }`}
      >
        {i}일
      </li>
    );
  }

  return (
    <div className="relative w-full px-3 py-1 text-sm text-center border border-solid border-customBrown rounded-xl">
      <span>{scheduleInput.days}일</span>
      <FontAwesomeIcon
        icon={listOpen ? faChevronUp : faChevronDown}
        className="absolute right-5 top-1.5 cursor-pointer"
        onClick={() => setListOpen((current) => !current)}
      />
      {listOpen && (
        <div
          className="fixed top-0 left-0 bg-white"
          onClick={() => setListOpen(false)}
        >
          <ul
            className="absolute left-0 z-10 w-full my-1 overflow-auto border border-solid cursor-pointer h-28 border-customBrown rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {days}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DaySelect;
