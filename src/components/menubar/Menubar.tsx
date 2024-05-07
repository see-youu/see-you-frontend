"use client";

import {
  faHouse,
  faMagnifyingGlass,
  faMessage,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Menubar = () => {
  return (
    <ul className="fixed bottom-0 flex items-center justify-around w-full text-2xl bg-white border-t border-gray-300 border-solid max-w-px-480">
      <li>
        <FontAwesomeIcon icon={faHouse} className="cursor-pointer" />
      </li>
      <li>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer" />
      </li>
      <li className="relative flex items-center justify-center w-20 h-20 text-3xl bg-white border border-gray-300 border-solid rounded-full bottom-4">
        <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
      </li>
      <li>
        <FontAwesomeIcon icon={faMessage} className="cursor-pointer" />
      </li>
      <li>
        <FontAwesomeIcon icon={faUser} className="cursor-pointer" />
      </li>
    </ul>
  );
};

export default Menubar;
