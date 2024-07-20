"use client";
import MenuHeader from "@/components/menubar/MenuHeader";
import { differenceInDays, formatDate } from "@/utils/parseFormat";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import emptyImg from "@/../public/emptyImg.png";

const page = (props: any) => {
  const schedule = {
    title: `약속 ${props.params.id}`,
    startDate: new Date("2024-07-16"),
    endDate: new Date("2024-07-18"),
    private: true,
    members: [
      { id: 1, name: "김성애", image: "" },
      { id: 2, name: "동애", image: "" },
    ],
    locations: [
      {
        name: "성수동감자탕",
        address: "성수동 1가",
      },
    ],
    notes: [
      {
        content: "9시까지 숙소 예약",
        memberId: 2,
      },
    ],
  };
  const [showDayPlan, setShowDayPlan] = useState(0);

  return (
    <>
      <MenuHeader title={props.params.id} />
      <header className="flex items-center justify-between w-full my-4 px-screen-x">
        <div className="flex flex-col">
          <p>
            {schedule.private ? "공개" : "비공개"} / {schedule.members.length}
          </p>
          <p className="text-gray-500">
            {formatDate(schedule.startDate)} ~ {formatDate(schedule.endDate)}{" "}
          </p>
        </div>
        <button className="">편집</button>
      </header>
      <main className="flex flex-col gap-8 px-screen-x">
        <ul className="flex w-full gap-2 overflow-x-auto">
          {Array.from(
            { length: differenceInDays(schedule.startDate, schedule.endDate) },
            (_, index) => (
              <li
                key={index}
                className={`flex-none px-5 py-3 border border-solid cursor-pointer rounded-2xl border-customOpacityGray ${
                  showDayPlan === index ? "bg-customYellow" : "white"
                }`}
                onClick={() => setShowDayPlan(index)}
              >
                {index + 1}일차
              </li>
            )
          )}
          {/* <li className="flex-none px-8 py-3 border border-dashed cursor-pointer rounded-2xl border-customOpacityGray">
            <FontAwesomeIcon icon={faPlus} />
          </li> */}
        </ul>
        <section className="flex flex-col w-full gap-2">
          <p>약속 장소</p>
          <div className="flex flex-col gap-3">
            {schedule.locations.map((location, idx) => (
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
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col w-full gap-2">
          <div className="flex items-center gap-4">
            <p>약속 멤버</p>
            <p className="text-sm">{schedule.members.length}/30</p>
          </div>
          <div className="flex w-full gap-3">
            {schedule.members.map((member) => (
              <div className="flex flex-col items-center gap-1" key={member.id}>
                <Image
                  src={member.image || emptyImg}
                  width={4 * 16} // 3rem
                  height={4 * 16} // 3rem
                  alt="profile"
                  className="block object-cover w-16 h-16 border border-gray-400 border-solid rounded-full"
                />
                <p className="text-sm">{member.name}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col w-full gap-2">
          <p>메모</p>
          <ul className="flex flex-col gap-1 text-sm">
            {schedule.notes.map((note, idx) => (
              <li className="flex items-center gap-4" key={idx}>
                <p className="px-4 py-1 border border-gray-500 border-solid rounded-xl">
                  {note.content}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default page;
