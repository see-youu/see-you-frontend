"use client";
import {
  fetchRecentSearch,
  saveSearcLocation,
} from "@/api/schedule/saveSearch";
import { usePlace } from "@/context/schedule/PlaceProvider";
import { KeywordType } from "@/types/scheduleType";
import {
  faLocationDot,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

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
  // const reversedKeywords = [...recentKeyword].reverse();

  const deleteSearchItem = (id: number) => {
    setRecentKeyword(
      recentKeyword.filter((current) => current.historyId !== id)
    );
  };

  const onClickKeyword = async (item: KeywordType) => {
    if (item.type === "KEYWORD") {
      handleSearch(item.keyword);
      setSearchKeyword(item.keyword);
    } else {
      const place = {
        name: item.keyword || "",
        category: item.category || "",
        address: item.address || "",
        longitude: item.longitude || 127.105399,
        latitude: item.latitude || 37.3595704,
      };
      setPlace(place);
      // setLocationOpen(true);
      setSearchKeyword(item.keyword);
      handleFindLocation();
      await saveSearcLocation(place);
    }
  };

  useEffect(() => {
    const fetchSearchList = async () => {
      const res = await fetchRecentSearch();
      if (res) setRecentKeyword(res.histories);
    };
    fetchSearchList();
  }, []);
  return (
    <>
      <div className="w-full mt-4 cursor-default">
        <p className="px-8 py-1 text-sm border-b border-solid border-lightGray100">
          최근 검색
        </p>
        {recentKeyword.length === 0 ? (
          <div className="my-4 text-sm text-center text-gray-400">
            최근 검색 목록이 없습니다.
          </div>
        ) : (
          <ul>
            {recentKeyword.map((item) => (
              <li
                className="grid items-center px-8 py-3 border-b border-solid border-lightGray100 text-lightGray200 grid-cols-1-5-1-1"
                key={item.historyId}
                onClick={() => onClickKeyword(item)}
              >
                <FontAwesomeIcon
                  icon={item.type === "KEYWORD" ? faSearch : faLocationDot}
                />
                <p className="cursor-pointer">{item.keyword}</p>
                <p className="text-xs justify-self-end">{item.date}</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer justify-self-end"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSearchItem(item.historyId);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default RecentSearchList;
