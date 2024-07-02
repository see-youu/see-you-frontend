"use client";
import { ScheduleProvider } from "@/context/schedule/ScheduleProvider";
import KoreaSchedule from "@/components/modal/KoreaSchedule";

export default function () {
  return (
    <ScheduleProvider>
      <KoreaSchedule />
    </ScheduleProvider>
  );
}
