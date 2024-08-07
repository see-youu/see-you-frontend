import { saveSearcLocation } from "@/api/schedule/handleSearch";
import { usePlace } from "@/context/schedule/PlaceProvider";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Place {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

interface SearchPlaceListProps {
  searchPlaces: Place[] | null;
  handleFindLocation: () => void;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchPlaceList: React.FC<SearchPlaceListProps> = ({
  searchPlaces,
  handleFindLocation,
  setSearchKeyword,
}) => {
  const { setPlace } = usePlace();

  const handleClickPlace = async (item: Place) => {
    const cleanedTitle = item.title.replace(/<[^>]*>/g, "");
    const category = item.category.split(">");
    const lastCategory =
      item.category === "" ? "" : category[category.length - 1];
    const integerPartLat = item.mapy.substring(0, 2); // 첫 두 자리는 정수 부분
    const decimalPartLat = item.mapy.substring(2); // 나머지는 소수점 아래 부분
    const integerPartLng = item.mapx.substring(0, 3);
    const decimalPartLng = item.mapx.substring(3);
    const formattedNumberLat = Number(integerPartLat + "." + decimalPartLat);
    const formattedNumberLng = Number(integerPartLng + "." + decimalPartLng);
    setSearchKeyword(cleanedTitle);
    handleFindLocation();
    const place = {
      name: cleanedTitle,
      category: lastCategory,
      address: item.address,
      longitude: formattedNumberLng,
      latitude: formattedNumberLat,
    };
    setPlace(place);
    await saveSearcLocation(place);
  };
  return (
    <ul className="w-full mt-4 overflow-auto cursor-default">
      {!!searchPlaces &&
        searchPlaces.map((item, idx) => {
          const cleanedTitle = item.title.replace(/<[^>]*>/g, "");
          const category = item.category.split(">");
          const lastCategory =
            item.category === "" ? "" : category[category.length - 1];
          return (
            <li
              className="flex items-center justify-start w-full py-3 border-b border-solid cursor-pointer border-lightGray100 text-lightGray200"
              key={idx}
              onClick={() => handleClickPlace(item)}
            >
              <FontAwesomeIcon icon={faLocationDot} className="w-1/6" />
              <main className="flex flex-col flex-1 w-5/6 pr-8">
                <div className="flex justify-between">
                  <p className="flex-auto text-lg text-black truncate">
                    {cleanedTitle}
                  </p>
                  <p className="flex-shrink-0">{lastCategory}</p>
                </div>
                <p className="truncate">{item.address}</p>
              </main>
            </li>
          );
        })}
    </ul>
  );
};

export default SearchPlaceList;
