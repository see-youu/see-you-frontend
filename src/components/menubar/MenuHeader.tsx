"use client";
import { useNavigation } from "@/utils/navigation";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MenuHeaderProps {
  title: string;
}
const MenuHeader: React.FC<MenuHeaderProps> = ({ title }) => {
  const { goBack } = useNavigation();
  return (
    <nav
      className="grid items-center grid-cols-5 px-3 text-xl border-b-2 border-solid font-mediums border-b-gray-300"
      style={{ height: "var(--menubar-height)" }}
    >
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="col-span-1 cursor-pointer"
        onClick={goBack}
      />
      <span className="col-span-3 text-center">{title}</span>
    </nav>
  );
};

export default MenuHeader;
