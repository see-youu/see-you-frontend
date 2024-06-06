import { useRouter } from "next/navigation";
import React from "react";

const SelectScheduleType = () => {
  const router = useRouter();

  const handleKoreaPage = () => {
    router.push("/schedule/korea");
  };
  const handleAbroadPage = () => {
    router.push("/schedule/abroad");
  };

  return (
    <div
      className="flex items-center justify-center gap-3"
      style={{ height: `calc(100vh - var(--menubar-height))` }}
    >
      <nav
        className="px-6 py-5 text-lg border border-solid rounded-md cursor-pointer bg-customYellow"
        onClick={handleKoreaPage}
      >
        국내 약속
      </nav>
      <nav
        className="px-6 py-5 text-lg text-white border border-solid rounded-md cursor-pointer bg-customBrown"
        onClick={handleAbroadPage}
      >
        해외 약속
      </nav>
    </div>
  );
};

export default SelectScheduleType;
