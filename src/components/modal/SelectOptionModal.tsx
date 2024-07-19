"use client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BottomSheet from "./BottomSheet";

interface SelectOptionProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  handleCloseModal: () => void;
}
const SelectOptionModal: React.FC<SelectOptionProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  handleCloseModal,
}) => {
  return (
    <div
      className="fixed top-0 left-0 z-30 flex items-end h-screen overflow-hidden overflow-x-hidden bg-customOpacityGray modal-width"
      onClick={handleCloseModal}
    >
      <BottomSheet handleCloseModal={handleCloseModal}>
        <ul>
          {options.map((option, idx) => (
            <li
              key={idx}
              className="flex justify-between px-2 py-4 border-b border-gray-200 border-solid cursor-pointer hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOption(option);
                handleCloseModal();
              }}
            >
              <p>{option}</p>
              {selectedOption === option && <FontAwesomeIcon icon={faCheck} />}
            </li>
          ))}
        </ul>
      </BottomSheet>
    </div>
  );
};

export default SelectOptionModal;
