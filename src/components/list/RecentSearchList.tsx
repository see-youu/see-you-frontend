"use client";
import { NaverLocationType } from "@/types/naverMapTypes";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface KeywordType {
  id: number;
  keyword: string;
  date: string;
  type: string;
}

interface RecentSearchListProps {
  handleFindLocation: (location: NaverLocationType) => void;
  recentKeyword: KeywordType[] | [];
  setRecentKeyword: (keywords: KeywordType[]) => void;
}
const RecentSearchList: React.FC<RecentSearchListProps> = ({
  recentKeyword,
  setRecentKeyword,
  handleFindLocation,
}) => {
  const reversedKeywords = [...recentKeyword].reverse();

  const deleteSearchItem = (id: number) => {
    setRecentKeyword(recentKeyword.filter((current) => current.id !== id));
  };
  return (
    <div className="w-full mt-4 cursor-default">
      <p className="px-8 py-1 text-sm border-b border-solid border-lightGray100">
        최근 검색
      </p>
      <ul>
        {reversedKeywords.map((item) => (
          <li
            className="grid items-center px-8 py-3 border-b border-solid border-lightGray100 text-lightGray200 grid-cols-1-5-1-1"
            key={item.id}
          >
            <FontAwesomeIcon icon={faSearch} />
            <p>{item.keyword}</p>
            <p className="text-xs justify-self-end">{item.date}</p>
            <FontAwesomeIcon
              icon={faXmark}
              className="cursor-pointer justify-self-end"
              onClick={() => {
                deleteSearchItem(item.id);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearchList;
