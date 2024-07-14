"use client";
import React, { useEffect } from "react";
import InsertLocationModal from "@/components/modal/schedule/InsertLocationModal";
import TimeSelect from "@/components/select/TimeSelect";
import DateRangeSelect from "@/components/select/DateRangeSelect";
import { useState } from "react";
import { useSchedule } from "@/context/schedule/ScheduleProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import InsertScheduleMemberModal from "./InsertScheduleMemberModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ErrorMessageBoxModal from "../ErrorMessageBoxModal";
import { formatDate, formatTime } from "@/utils/parseFormat";
import { getMemberId } from "@/utils/jwtToken";
import { createSchedule } from "@/api/schedule/createSchedule";

export const KoreaSchedule = () => {
  const { scheduleInput, setScheduleInput } = useSchedule();
  const router = useRouter();

  const dateButton = [{ name: "미정" }, { name: "날짜 선택" }];
  const timeButton = [{ name: "미정" }, { name: "시간 선택" }];
  const [mapOpen, setMapOpen] = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [messageBoxOpen, setMessageBoxOpen] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [note, setNote] = useState<string>("");
  const [message, setMessage] = useState("");

  const handleGoBack = () => {
    router.push("/schedule");
  };

  const handleCompleteSchedule = () => {
    if (scheduleInput.name === "") {
      setMessage("약속 이름을 작성해 주세요.");
      setMessageBoxOpen(true);
    } else {
      const formatMembers = scheduleInput.members.map((member) => member.id);
      formatMembers.push(getMemberId());
      const data = {
        title: scheduleInput.name,
        startDate: !!scheduleInput.startDate
          ? formatDate(scheduleInput.startDate)
          : "",
        endDate: !!scheduleInput.endDate
          ? formatDate(scheduleInput.endDate)
          : "",
        startTime: !!scheduleInput.startTime
          ? formatTime(scheduleInput.startTime)
          : "",
        endTime: "00:00:00",
        locations: scheduleInput.locations,
        notes: scheduleInput.notes,
        memberIds: formatMembers,
      };
      const responseData = createSchedule(data);
      console.log("response data : ", responseData);
    }
  };

  const handleMapModalClose = () => {
    setMapOpen(false);
  };

  const handleMemberModalClose = () => {
    setMemberModalOpen(false);
  };

  const handleDeletePlace = (indexToRemove: number) => {
    setScheduleInput((current) => ({
      ...current,
      locations: current.locations.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleInsertNote = () => {
    if (!!note && note.length > 0) {
      setScheduleInput((current) => ({
        ...current,
        notes: [...current.notes, { content: note, memberId: getMemberId() }],
      }));
      setNote("");
    }
  };

  const handleDeleteNote = (indexToRemove: number) => {
    setScheduleInput((current) => ({
      ...current,
      notes: current.notes.filter((_, index) => index !== indexToRemove),
    }));
  };

  useEffect(() => {
    let timerId: number;

    if (messageBoxOpen) {
      setMessageVisible(true);
      timerId = window.setTimeout(() => {
        setMessageBoxOpen(false);
        setMessageVisible(false);
      }, 3000);
    }

    // 컴포넌트 언마운트 또는 messageBoxOpen 상태가 변경될 때 타이머 정리
    return () => clearTimeout(timerId);
  }, [messageBoxOpen]);

  return (
    <main
      className="flex flex-col items-center gap-6 px-8 py-4 mb-24"
      style={{
        minHeight: `calc(100vh - var(--menubar-height) - 6rem)`,
      }}
    >
      {messageBoxOpen && (
        <ErrorMessageBoxModal message={message} visible={messageVisible} />
      )}
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
        <div className="flex flex-col gap-3">
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
      <section className="flex flex-col w-full gap-2">
        <div className="flex items-center gap-4">
          <p>약속 멤버</p>
          <p className="text-sm">{scheduleInput.members.length}/30</p>
        </div>
        <div className="flex w-full gap-3">
          {scheduleInput.members.map((member) => (
            <div className="flex flex-col items-center gap-1" key={member.id}>
              <Image
                src={member.image}
                width={4 * 16} // 3rem
                height={4 * 16} // 3rem
                alt="profile"
                className="block object-cover w-16 h-16 border border-gray-400 border-solid rounded-full"
              />
              <p className="text-sm">{member.name}</p>
            </div>
          ))}
          <button
            className={`w-16 h-16 text-2xl border border-dotted border-black rounded-full cursor-pointer
                `}
            onClick={() => setMemberModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="text-gray-500" />
          </button>
        </div>
      </section>
      <section className="flex flex-col w-full gap-2">
        <p>메모</p>
        <form
          className="flex w-full gap-4 "
          onSubmit={(e) => {
            e.preventDefault();
            handleInsertNote();
          }}
        >
          <div className="relative w-4/5">
            <input
              type="text"
              className="w-full h-full pl-2 text-sm border-b border-solid border-b-gray-500 pr-11"
              placeholder="메모를 작성하세요."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={30}
            />
            <p className="absolute text-xs text-gray-400 right-1 bottom-2">
              {note.length}/30
            </p>
          </div>
          <button className="w-1/5 py-1.5 text-sm border border-solid cursor-pointer bg-customYellow rounded-xl border-customBrown">
            추가
          </button>
        </form>
        <ul className="flex flex-col gap-1 text-sm">
          {scheduleInput.notes.map((note, idx) => (
            <li className="flex items-center gap-4" key={idx}>
              <p className="px-4 py-1 border border-gray-500 border-solid rounded-xl">
                {note.content}
              </p>
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer "
                onClick={() => handleDeleteNote(idx)}
              />
            </li>
          ))}
        </ul>
      </section>
      {mapOpen && <InsertLocationModal handleClose={handleMapModalClose} />}
      {memberModalOpen && (
        <InsertScheduleMemberModal handleClose={handleMemberModalClose} />
      )}
      <div className="fixed bottom-0 left-0 flex items-center w-full h-20 gap-4 px-8 bg-white border-t border-gray-400 border-solid modal-width">
        <div
          className="w-1/3 py-1 text-center border border-gray-500 border-solid cursor-pointer rounded-xl"
          onClick={handleGoBack}
        >
          취소
        </div>
        <div
          className="w-2/3 py-1 text-center border border-gray-500 border-solid cursor-pointer rounded-xl bg-customYellow"
          onClick={handleCompleteSchedule}
        >
          약속 만들기
        </div>
      </div>
    </main>
  );
};

export default KoreaSchedule;
