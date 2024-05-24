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
    <nav className="grid grid-cols-5 p-3 text-xl items-center font-light border-b-2 border-solid border-b-gray-300">
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
