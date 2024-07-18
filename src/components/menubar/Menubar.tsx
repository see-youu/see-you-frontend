import {
  faHouse,
  faList,
  faMagnifyingGlass,
  faMessage,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Menubar = () => {
  return (
    <nav className="fixed bottom-0 flex items-center justify-around w-full px-2 text-xl bg-white border-t border-gray-300 border-solid max-w-px-480">
      <Link href="/home" passHref>
        <FontAwesomeIcon icon={faHouse} className="cursor-pointer" />
      </Link>
      <Link href="/home" passHref>
        <FontAwesomeIcon icon={faMessage} className="cursor-pointer" />
      </Link>
      <Link
        href="/schedule"
        passHref
        className="relative flex items-center justify-center w-20 h-20 text-2xl bg-white border border-gray-300 border-solid rounded-full bottom-4"
      >
        <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
      </Link>
      <Link href="/list" passHref>
        <FontAwesomeIcon icon={faList} className="cursor-pointer" />
      </Link>
      <Link href="/home" passHref>
        <FontAwesomeIcon icon={faUser} className="cursor-pointer" />
      </Link>
    </nav>
  );
};

export default Menubar;
