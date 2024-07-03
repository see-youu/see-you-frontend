"use client";
import { ScheduleProvider } from "@/context/schedule/ScheduleProvider";
import KoreaSchedule from "@/components/modal/KoreaSchedule";
import { LocationProvider } from "@/context/schedule/LocationProvider";

export default function () {
  return (
    <ScheduleProvider>
      <LocationProvider>
        <KoreaSchedule />
      </LocationProvider>
    </ScheduleProvider>
  );
}
