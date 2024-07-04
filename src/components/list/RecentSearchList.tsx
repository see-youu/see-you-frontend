"use client";
import { usePlace } from "@/context/schedule/PlaceProvider";
import { KeywordType } from "@/types/scheduleType";
import {
  faLocationDot,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface RecentSearchListProps {
  recentKeyword: KeywordType[] | [];
  setRecentKeyword: React.Dispatch<React.SetStateAction<KeywordType[]>>;
  handleSearch: (searchKeyword: string) => void;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleFindLocation: () => void;
}
const RecentSearchList: React.FC<RecentSearchListProps> = ({
  recentKeyword,
  setRecentKeyword,
  handleSearch,
  setSearchKeyword,
  handleFindLocation,
}) => {
  const { setPlace } = usePlace();
  const reversedKeywords = [...recentKeyword].reverse();

  const deleteSearchItem = (id: number) => {
    setRecentKeyword(recentKeyword.filter((current) => current.id !== id));
  };

  const onClickKeyword = (item: KeywordType) => {
    if (item.type === "word") {
      handleSearch(item.keyword);
      setSearchKeyword(item.keyword);
    } else {
      setPlace({
        title: item.keyword || "",
        category: item.category || "",
        address: item.address || "",
        longitude: item.longitude || 127.105399,
        latitude: item.latitude || 37.3595704,
      });
      // setLocationOpen(true);
      setSearchKeyword(item.keyword);
      handleFindLocation();
    }
  };
  return (
    <>
      <div className="w-full mt-4 cursor-default">
        <p className="px-8 py-1 text-sm border-b border-solid border-lightGray100">
          최근 검색
        </p>
        <ul>
          {reversedKeywords.map((item) => (
            <li
              className="grid items-center px-8 py-3 border-b border-solid border-lightGray100 text-lightGray200 grid-cols-1-5-1-1"
              key={item.id}
              onClick={() => onClickKeyword(item)}
            >
              <FontAwesomeIcon
                icon={item.type === "word" ? faSearch : faLocationDot}
              />
              <p className="cursor-pointer">{item.keyword}</p>
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
    </>
  );
};

export default RecentSearchList;
