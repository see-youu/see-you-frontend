import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const RecentSearchList = () => {
  const recentKeyword = [
    {
      id: 0,
      keyword: "소문난감자탕",
      date: "06.13",
      type: "place",
    },
    {
      id: 1,
      keyword: "감자빵",
      date: "06.14",
      type: "word",
    },
    {
      id: 2,
      keyword: "고기",
      date: "06.14",
      type: "word",
    },
  ];

  const reversedKeywords = [...recentKeyword].reverse();

  return (
    <div className="w-full mt-4 cursor-default">
      <p className="px-8 py-1 text-sm border-b border-solid border-lightGray100">
        최근 검색
      </p>
      <ul>
        {reversedKeywords.map((item) => (
          <li className="grid items-center px-8 py-3 border-b border-solid border-lightGray100 text-lightGray200 grid-cols-1-5-1-1">
            <FontAwesomeIcon icon={faSearch} />
            <p>{item.keyword}</p>
            <p className="text-xs justify-self-end">{item.date}</p>
            <FontAwesomeIcon
              icon={faXmark}
              className="cursor-pointer justify-self-end"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearchList;
