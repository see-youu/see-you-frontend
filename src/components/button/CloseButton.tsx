import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type CloseButtonProps = {
  onClick: () => void;
};
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      icon={faXmark}
      className="absolute text-xl cursor-pointer top-3 right-3"
      onClick={onClick}
    />
  );
};

export default CloseButton;
