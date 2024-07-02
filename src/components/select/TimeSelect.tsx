import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../../styles/react-datepicker.css";
import { useSchedule } from "@/context/schedule/ScheduleProvider";

const TimeSelect = () => {
  const { scheduleInput, setScheduleInput } = useSchedule();
  return (
    <DatePicker
      selected={scheduleInput.startTime}
      onChange={(date: Date) =>
        setScheduleInput((current) => ({ ...current, startTime: date }))
      }
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15} // 15분 단위로 시간을 선택할 수 있도록 설정
      timeCaption="Time" // 시간 선택 부분의 라벨
      dateFormat="HH:mm" // 시간 포맷 설정
      className="w-full px-3 py-1 text-sm text-center border border-solid cursor-pointer border-customBrown rounded-xl"
      placeholderText="Select time"
    />
  );
};

export default TimeSelect;
