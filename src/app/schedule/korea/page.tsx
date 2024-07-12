"use client";
import { ScheduleProvider } from "@/context/schedule/ScheduleProvider";
import KoreaSchedule from "@/components/modal/schedule/KoreaSchedule";
import { PlaceProvider } from "@/context/schedule/PlaceProvider";

export default function () {
  return (
    <ScheduleProvider>
      <PlaceProvider>
        <KoreaSchedule />
      </PlaceProvider>
    </ScheduleProvider>
  );
}
