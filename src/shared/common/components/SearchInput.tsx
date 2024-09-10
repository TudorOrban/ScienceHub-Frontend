import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchInputProps {
    searchTerm: string;
    onTermChange: (term: string) => void;
    searchOnChange?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onTermChange, searchOnChange }) => {
    const [localTerm, setLocalTerm] = useState<string>(searchTerm);

    useEffect(() => {
        setLocalTerm(searchTerm);
    }, [searchTerm]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTerm(e.target.value);
        if (!searchOnChange) return;
        onTermChange(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onTermChange(localTerm); 
        }
    };

    const handleSearchClick = () => {
        onTermChange(localTerm); 
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={localTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Search ScienceHub"
                className="custom-search-input w-64 rounded-l-md"
            />
            <button
                className="search-button rounded-l-none rounded-r-md"
                onClick={handleSearchClick}
            >
                <FontAwesomeIcon icon={faSearch} className="small-icon" />
            </button>
        </div>
    );
};

export default SearchInput;