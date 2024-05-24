import DatePicker from "react-datepicker";
import "../../styles/react-datepicker.css";

interface DateSelectProps {
  scheduleInput: ScheduleProps;
  setScheduleInput: React.Dispatch<React.SetStateAction<ScheduleProps>>;
}

const DateRangeSelect: React.FC<DateSelectProps> = ({
  scheduleInput,
  setScheduleInput,
}) => {
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setScheduleInput((current) => ({
      ...current,
      startDate: start,
      endDate: end,
    }));
  };

  return (
    <DatePicker
      onChange={onChange}
      // minDate={new Date()}
      maxDate={
        scheduleInput.startDate
          ? new Date(
              scheduleInput.startDate.getTime() + 30 * 24 * 60 * 60 * 1000
            )
          : null
      }
      selectsRange
      startDate={scheduleInput.startDate}
      endDate={scheduleInput.endDate}
      isClearable={true}
      placeholderText="시작 날짜와 종료 날짜 선택"
      calendarClassName="rasta-stripes"
      dateFormat="yyyy.MM.dd"
      className="w-full px-3 py-1 text-sm text-center border border-solid cursor-pointer border-customBrown rounded-xl"
    />
  );
};

export default DateRangeSelect;
