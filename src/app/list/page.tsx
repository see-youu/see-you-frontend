"use client";
import SelectOptionModal from "@/components/modal/SelectOptionModal";
import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function () {
  const sortOptions = ["최신순", "작성일순", "옵션1", "옵션2"];
  const showOptions = ["전체", "공개", "비공개"];
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]); // 초기 상태 설정
  const [selectedOption, setSelectedOption] = useState(showOptions[0]); // 초기 상태 설정
  const [optionModalOpen, setOptionModalOpen] = useState(false);

  const handleSearch = () => {
    console.log(searchTitle);
  };

  const handleSelectSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value); // 선택된 값으로 상태 업데이트
    console.log("Selected value:", e.target.value); // 선택된 값을 콘솔에 출력
  };

  useEffect(() => {}, []);
  return (
    <>
      <div
        className="flex flex-col items-center gap-3"
        style={{ height: `calc(100vh - var(--menubar-height))` }}
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
        <nav className="flex justify-between w-full px-10">
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
        <main className="flex flex-col">
          <div>
            <p></p>
          </div>
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
