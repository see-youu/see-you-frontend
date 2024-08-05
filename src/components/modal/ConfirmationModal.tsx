import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ModalWrapper from "./ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeConfirmationModal, ModalState } from "@/store/modalSlice";
import { useConfirm } from "@/context/ConfirmationProvider";

const ConfirmationModal: React.FC = () => {
  const dispatch = useDispatch();
  const { confirmMessage } = useSelector(
    (state: RootState) => state.modal as ModalState
  );
  const { confirmFunction, confirmCancelFunction } = useConfirm();

  const handleCloseConfirmation = () => {
    dispatch(closeConfirmationModal());
    confirmCancelFunction();
  };

  const handleConfirmation = () => {
    confirmFunction();
  };

  return (
    <ModalWrapper backgroundColor="transparent">
      <div
        className="flex items-center justify-center w-full h-full text-sm"
        onClick={handleCloseConfirmation}
      >
        <div
          className="relative flex flex-col items-center gap-4 px-10 py-8 border border-gray-200 border-solid rounded-md bg-gray-50"
          onClick={(e) => e.stopPropagation()}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute text-lg cursor-pointer right-3 top-3"
            onClick={handleCloseConfirmation}
          />
          <p>{confirmMessage}</p>
          <div className="flex justify-center w-full gap-4 text-xs">
            <button
              className="px-4 py-2 bg-white border border-gray-200 border-solid rounded-md"
              onClick={handleCloseConfirmation}
            >
              취소
            </button>
            <button
              className="px-4 py-2 rounded-md bg-customYellow"
              onClick={handleConfirmation}
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
