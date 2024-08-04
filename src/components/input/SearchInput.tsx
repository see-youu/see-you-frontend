import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  setValue,
  onSearch,
}) => {
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className={`my-4 relative w-4/5`}
    >
      <input
        type="text"
        className="w-full h-12 pl-2 pr-12 border border-black border-solid rounded-md"
        value={value}
        placeholder="친구 이름으로 검색"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <button className="absolute -translate-y-1/2 right-4 top-1/2">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchInput;
