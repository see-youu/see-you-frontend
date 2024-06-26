"use client";
import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import NaverMap from "../map/NaverMap";
import axios from "axios";
import MenuHeader from "../menubar/MenuHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import RecentSearchList from "../list/RecentSearchList";
import SearchPlaceList from "../list/SearchPlaceList";
import { NaverLocationType } from "@/types/naverMapTypes";
import PlaceLocationModal from "./PlaceLocationModal";

interface InsertModalProps {
  handleClose: () => void;
}

const InsertLocationModal: React.FC<InsertModalProps> = ({ handleClose }) => {
  const [data, setData] = useState(null);
  const [searchPlace, setSearchPlace] = useState("");
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchListModalOpen, setSearchListModalOpen] = useState(false);
  const [placeLocationModalOpen, setPlaceLocationModalOpen] = useState(false);
  const [location, setLocation] = useState<NaverLocationType>({
    lat: 37.3595704,
    lng: 127.105399,
  });
  const [currentLocation, setCurrentLocation] = useState<NaverLocationType>({
    lat: 37.3595704,
    lng: 127.105399,
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/naver/search?query=${searchPlace}`
      );
      setData(response.data.data.items);
      setSearchListModalOpen(true);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };

  const handleBack = () => {
    if (searchModalOpen) {
      if (searchListModalOpen) setSearchListModalOpen(false);
      else setSearchModalOpen(false);
      setSearchPlace("");
    } else handleClose();
  };

  const render = () => {
    if (searchModalOpen) {
      if (searchListModalOpen)
        return (
          <SearchPlaceList
            searchPlaces={data}
            handleFindLocation={handleFindLocation}
          />
        );
      return <RecentSearchList />;
    } else
      return <NaverMap lat={currentLocation.lat} lng={currentLocation.lng} />;
  };

  const handleFindLocation = (location: NaverLocationType) => {
    setLocation(location);
    setPlaceLocationModalOpen(true);
  };

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
          location={location}
          searchKeyword={searchPlace}
        />
      ) : (
        <ModalWrapper>
          <MenuHeader title="장소 추가하기" handleBack={handleBack} />
          <div
            className="relative flex flex-col items-center gap-2 bg-white"
            onClick={(e) => e.stopPropagation()}
            style={{ height: `calc(100vh - var(--menubar-height))` }}
          >
            <form
              action=""
              onSubmit={handleSearch}
              className={`${
                searchModalOpen
                  ? "relative"
                  : `absolute -translate-x-1/2 left-1/2`
              } z-10 mt-4`}
              onClick={() => setSearchModalOpen(true)}
            >
              <input
                type="text"
                className="h-12 pl-2 pr-12 border border-black border-solid rounded-md w-96"
                value={searchPlace}
                placeholder="장소, 키워드 검색"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchPlace(e.target.value)
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
