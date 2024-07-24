import {
  faHouse,
  faList,
  faPlus,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import emptyImg from "@/../public/emptyImg.png";

const Menubar = () => {
  return (
    <nav
      className="fixed bottom-0 flex items-center justify-around px-2 text-xl bg-white border-t border-gray-300 border-solid modal-width"
      style={{ height: `var(--menubar-height)` }}
    >
      <Link href="/home" passHref>
        <FontAwesomeIcon icon={faHouse} className="cursor-pointer" />
      </Link>
      <Link href="/friends" passHref>
        <FontAwesomeIcon icon={faUserGroup} className="cursor-pointer" />
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
        {/* <FontAwesomeIcon icon={faUser} className="cursor-pointer" /> */}
        <Image
          src={emptyImg}
          width={2.5 * 16} // 3rem
          height={2.5 * 16} // 3rem
          alt="profile"
          className="block object-cover w-10 h-10 border border-gray-400 border-solid rounded-full"
        />
      </Link>
    </nav>
  );
};

export default Menubar;
