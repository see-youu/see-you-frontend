"use client";
import React, { useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import NaverMap from "@/components/map/NaverMap";
import MenuHeader from "@/components/menubar/MenuHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import RecentSearchList from "@/components/list/RecentSearchList";
import SearchPlaceList from "@/components/list/SearchPlaceList";
import { NaverLocationType } from "@/types/naverMapTypes";
import PlaceLocationModal from "@/components/modal/schedule/PlaceLocationModal";
import { fetchSearchKeywordData } from "@/api/schedule/fetchSearchKeywordData";
import { KeywordType } from "@/types/scheduleType";
import { saveSearch } from "@/api/schedule/handleSearch";

interface InsertModalProps {
  handleClose: () => void;
}

const InsertLocationModal: React.FC<InsertModalProps> = ({ handleClose }) => {
  const [data, setData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchListModalOpen, setSearchListModalOpen] = useState(false);
  const [placeLocationModalOpen, setPlaceLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<NaverLocationType>({
    lat: 37.3595704,
    lng: 127.105399,
  });
  const [recentKeyword, setRecentKeyword] = useState<KeywordType[]>([]);

  const handleSearch = async (searchKeyword: string) => {
    const res = await fetchSearchKeywordData(searchKeyword);
    await saveSearch(searchKeyword);
    // if (searchData) setRecentKeyword(searchData.histories);
    setData(res.data.items);
    setSearchListModalOpen(true);
  };

  const handleBack = () => {
    if (searchModalOpen) {
      if (searchListModalOpen) setSearchListModalOpen(false);
      else setSearchModalOpen(false);
      setSearchKeyword("");
    } else handleClose();
  };

  const render = () => {
    // 장소 검색창이 켜져있을때
    if (searchModalOpen) {
      // 장소 검색창 -> 검색 목록 보여주는 창 켜저있을때
      if (searchListModalOpen)
        return (
          <SearchPlaceList
            searchPlaces={data}
            handleFindLocation={handleFindLocation}
            setSearchKeyword={setSearchKeyword}
          />
        );
      // 장소 검색창 누르면 최근 검색 목록 보여줌
      return (
        <RecentSearchList
          recentKeyword={recentKeyword}
          setRecentKeyword={setRecentKeyword}
          handleSearch={handleSearch}
          setSearchKeyword={setSearchKeyword}
          handleFindLocation={handleFindLocation}
        />
      );
    } else {
      // 장소 검색창이 꺼져있으면 지도화면만 현재 지도화면만 나타나면 됨
      return <NaverMap lat={currentLocation.lat} lng={currentLocation.lng} />;
    }
  };

  const handleFindLocation = () => {
    setPlaceLocationModalOpen(true);
  };

  // 현재 위치 가져오는 로직
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("current", currentLocation);
          setCurrentLocation(currentLocation);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      {placeLocationModalOpen ? (
        <PlaceLocationModal
          handleClose={() => setPlaceLocationModalOpen(false)}
          searchKeyword={searchKeyword}
          handleAddBtn={handleClose}
        />
      ) : (
        <ModalWrapper>
          <MenuHeader title="장소 추가하기" handleBack={handleBack} />
          <div
            className="relative flex flex-col items-center gap-2 bg-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{ height: `calc(100vh - var(--menuheader-height))` }}
          >
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchKeyword);
              }}
              className={`${
                searchModalOpen
                  ? "relative w-4/5"
                  : `absolute -translate-x-1/2 left-1/2`
              } z-10 mt-4 w-4/5`}
              onClick={() => setSearchModalOpen(true)}
            >
              <input
                type="text"
                className="w-full h-12 pl-2 pr-12 border border-black border-solid rounded-md"
                value={searchKeyword}
                placeholder="장소, 키워드 검색"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchKeyword(e.target.value)
                }
              />
              <button className="absolute -translate-y-1/2 right-4 top-1/2">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            {render()}
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default InsertLocationModal;
