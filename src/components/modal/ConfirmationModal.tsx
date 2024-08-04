import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ModalWrapper from "./ModalWrapper";

interface ConfirmationModalProps {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onCancel,
  onConfirm,
}) => {
  return (
    <ModalWrapper backgroundColor="transparent">
      <div
        className="flex items-center justify-center w-full h-full text-sm"
        onClick={onCancel}
      >
        <div
          className="relative flex flex-col items-center gap-4 px-10 py-8 border border-gray-200 border-solid rounded-md bg-gray-50"
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute text-lg cursor-pointer right-3 top-3"
            onClick={onCancel}
          />
          <p>{message}</p>
          <div className="flex justify-center w-full gap-4 text-xs">
            <button
              className="px-4 py-2 bg-white border border-gray-200 border-solid rounded-md"
              onClick={onCancel}
            >
              취소
            </button>
            <button
              className="px-4 py-2 rounded-md bg-customYellow"
              onClick={onConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmationModal;
