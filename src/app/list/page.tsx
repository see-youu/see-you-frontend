"use client";
import { fetchScheduleList } from "@/api/schedule/fetchScheduleList";
import SelectOptionModal from "@/components/modal/SelectOptionModal";
import { faLock, faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import emptyImg from "@/../public/emptyImg.png";
import Link from "next/link";
import NoneBackMenuHeader from "@/components/menubar/NoneBackMenuHeader";
interface scheduleType {
  appointmentId: number;
  title: string;
}
export default function () {
  const sortOptions = ["최신순", "작성일순", "옵션1", "옵션2"];
  const showOptions = ["전체", "공개", "비공개"];
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]); // 초기 상태 설정
  const [selectedOption, setSelectedOption] = useState(showOptions[0]); // 초기 상태 설정
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [scheduleList, setScheduleList] = useState<scheduleType[]>([]);
  const handleSearch = () => {
    console.log(searchTitle);
  };

  useEffect(() => {
    const scheduleList = async () => {
      const data = await fetchScheduleList();
      setScheduleList(data);
    };
    scheduleList();
  }, []);

  return (
    <>
      <NoneBackMenuHeader title="약속 목록" />
      <div
        className="flex flex-col items-center gap-3"
        style={{ height: `calc(100vh - var(--menuheader-height))` }}
      >
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className={`my-4 relative w-4/5`}
        >
          <input
            type="text"
            className="w-full h-12 pl-2 pr-12 border border-black border-solid rounded-md"
            value={searchTitle}
            placeholder="약속 이름으로 검색"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTitle(e.target.value)
            }
          />
          <button className="absolute -translate-y-1/2 right-4 top-1/2">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <nav className="flex justify-between w-full px-screen-x">
          <ul className="flex">
            {showOptions.map((option, idx) => (
              <li
                key={idx}
                className={`px-2 ${
                  selectedOption === option
                    ? "text-black font-semibold"
                    : "text-gray-500"
                } cursor-pointer`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setOptionModalOpen(true)}
          >
            <FontAwesomeIcon icon={faSort} />
            <p>{selectedSort}</p>
          </div>
        </nav>
        <main
          className="flex flex-col w-full py-2 px-screen-x"
          style={{ paddingBottom: `var(--menubar-height)` }}
        >
          {!!scheduleList &&
            scheduleList.map((schedule, idx) => (
              <Link
                href={`/list/${schedule.appointmentId}`}
                className="flex w-full gap-4 py-5 border-b border-gray-200 border-solid cursor-pointer"
                key={idx}
              >
                <Image
                  src={emptyImg}
                  width={3 * 16} // 3rem
                  height={3 * 16} // 3rem
                  alt="profile"
                  className="self-center block object-cover w-12 h-12 border border-gray-400 border-solid rounded-full"
                />
                <div className="flex flex-col flex-1 text-sm">
                  <p className="text-base font-semibold">{schedule.title}</p>
                  <p>2024.07.17</p>
                  <p>멤버 2명</p>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faLock}
                    className="pt-2 text-gray-400"
                  />
                </div>
              </Link>
            ))}
        </main>
      </div>
      {optionModalOpen && (
        <SelectOptionModal
          options={sortOptions}
          selectedOption={selectedSort}
          setSelectedOption={setSelectedSort}
          handleCloseModal={() => setOptionModalOpen(false)}
        />
      )}
    </>
  );
}
