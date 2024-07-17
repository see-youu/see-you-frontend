import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

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
      className="fixed top-0 left-0 z-30 flex items-end h-screen overflow-x-hidden overflow-y-auto bg-customOpacityGray modal-width"
      onClick={handleCloseModal}
    >
      <div className="w-full px-10 py-6 bg-white rounded-t-lg">
        <div className="w-24 h-1 mx-auto bg-gray-300 rounded-lg"></div>
        <ul>
          {options.map((option, idx) => (
            <li
              key={idx}
              className="flex justify-between py-4 border-b border-gray-200 border-solid cursor-pointer"
              onClick={() => {
                setSelectedOption(option);
                handleCloseModal();
              }}
            >
              <p>{option}</p>
              {selectedOption === option && <FontAwesomeIcon icon={faCheck} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectOptionModal;
