import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HeaderSearchInput = () => {

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={""}
                onChange={() => {}}
                // onFocus={() => setIsPopoverOpen(true)}
                placeholder={"Search ScienceHub"}
                className="custom-search-input w-64 px-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
                className="search-button w-10 h-10 rounded-l-none rounded-r-md"
                onClick={() => {}}
            >
                <FontAwesomeIcon icon={faSearch} className="small-icon" />
            </button>
        </div>
    );
};

export default HeaderSearchInput;