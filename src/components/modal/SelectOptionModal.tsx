"use client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BottomSheetModal from "./BottomSheetModal";

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
    <BottomSheetModal handleCloseModal={handleCloseModal}>
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
    </BottomSheetModal>
  );
};

export default SelectOptionModal;
