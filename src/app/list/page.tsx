"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function () {
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedSort, setSelectedSort] = useState(""); // 초기 상태 설정
  const [selectedOption, setSelectedOption] = useState(0); // 초기 상태 설정

  const handleSearch = () => {
    console.log(searchTitle);
  };

  const handleSelectSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value); // 선택된 값으로 상태 업데이트
    console.log("Selected value:", e.target.value); // 선택된 값을 콘솔에 출력
  };

  return (
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
          <li
            className={`px-2 ${
              selectedOption === 0
                ? "text-black font-semibold"
                : "text-gray-500"
            } cursor-pointer`}
            onClick={() => setSelectedOption(0)}
          >
            전체
          </li>
          <li
            className={`px-2 ${
              selectedOption === 1
                ? "text-black font-semibold"
                : "text-gray-500"
            } cursor-pointer`}
            onClick={() => setSelectedOption(1)}
          >
            공개
          </li>
          <li
            className={`px-2 ${
              selectedOption === 2
                ? "text-black font-semibold"
                : "text-gray-500"
            } cursor-pointer`}
            onClick={() => setSelectedOption(2)}
          >
            비공개
          </li>
        </ul>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleSelectSortChange(e)
          }
          value={selectedSort}
          className="cursor-pointer"
        >
          <option value="recent">최신순</option>
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
          <option value="option3">옵션 3</option>
        </select>
      </nav>
    </div>
  );
}
