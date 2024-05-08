import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
  return (
    <div>
      <nav className="flex justify-start items-center p-3 text-2xl font-light border-ㅠ border-solid border-b-gray-400">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span className="justify-self-center">새 약속 만들기</span>
      </nav>
    </div>
  );
}
