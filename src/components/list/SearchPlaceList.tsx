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
}
const SearchPlaceList: React.FC<SearchPlaceListProps> = ({ searchPlaces }) => {
  return (
    <div className="w-full mt-4 overflow-auto cursor-default">
      <ul>
        {!!searchPlaces &&
          searchPlaces.map((item, idx) => {
            const cleanedTitle = item.title.replace(/<[^>]*>/g, "");
            const category = item.category.split(">");
            const lastCategory =
              item.category === "" ? "" : category[category.length - 1];
            return (
              <li
                className="flex items-center justify-start px-8 py-3 border-b border-solid border-lightGray100 text-lightGray200"
                key={idx}
              >
                <FontAwesomeIcon icon={faLocationDot} className="mr-8" />
                <main className="flex flex-col flex-1">
                  <section className="flex justify-between">
                    <p className="flex-auto text-lg text-black truncate">
                      {cleanedTitle}
                    </p>
                    <p className="flex-shrink-0">{lastCategory}</p>
                  </section>
                  <section>
                    <p className="truncate">{item.address}</p>
                  </section>
                </main>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchPlaceList;
