import { useState } from "react";
import "./searchInput.css";
import { SearchInputProps } from "../../types/types";

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmitSearchQuery = () => {
    if (inputValue.trim() !== "") {
      onSearch(inputValue);
      setInputValue("");
    }
  };
  return (
    <div className="search-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputValue !== "") {
            handleSubmitSearchQuery();
          }
        }}
      />
      <button onClick={handleSubmitSearchQuery} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchInput;
