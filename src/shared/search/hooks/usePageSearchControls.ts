import { useState } from "react";
import { SearchParams } from "../models/Search";

export const usePageSearchControls = (initialSearchParams: SearchParams) => {
    const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);

    const handleTermChange = (term: string) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            searchTerm: term,
            page: 1
        }));
    };

    const handleSortOptionChange = (sortOption: string) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            sortBy: sortOption,
            page: 1
        }));
    };
    
    const handleToggleDescending = () => {
        setSearchParams(prevParams => ({
            ...prevParams,
            sortDescending: !prevParams.sortDescending,
            page: 1
        }));
    };

    const handlePageChange = (page: number) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            page: page
        }));
    };

    return { searchParams, handleTermChange, handleSortOptionChange, handleToggleDescending, handlePageChange };
}