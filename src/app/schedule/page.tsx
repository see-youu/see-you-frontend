"use client";
import MenuHeader from "@/components/menubar/MenuHeader";
import SelectScheduleType from "./SelectScheduleType";

export default function () {
  return (
    <>
      <MenuHeader title="새 약속 만들기" />
      <SelectScheduleType />
    </>
  );
}
