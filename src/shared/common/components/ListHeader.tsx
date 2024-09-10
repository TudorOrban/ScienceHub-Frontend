import { SearchParams } from "@/shared/search/models/Search";
import SearchInput from "./SearchInput";
import { UIItem } from "../models/UITypes";

export interface ListHeaderProps {
    title: string;
    sortOptions?: UIItem[];
    searchParams: SearchParams;
    onTermChange?: (term: string) => void;
    onSortOptionChange?: (sortOption: string) => void;
    onToggleDescending?: () => void;
}


const ListHeader = ({
    title,
    sortOptions = [],
    searchParams,
    onTermChange,
    onSortOptionChange,
    onToggleDescending
}: ListHeaderProps) => {

    const handleTermChange = (term: string) => {
        onTermChange?.(term);
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortOptionChange?.(e.target.value);
    };
    
    return (
        <div className="page-standard-horizontal-padding py-6">
            <h2 className="page-title">
                {title}
            </h2>

            <div className="flex items-center flex-wrap xl:flex-nowrap">
                <SearchInput searchTerm={searchParams.searchTerm ?? ""} onTermChange={handleTermChange} />

                <select
                    className="custom-select ml-2"
                    value={searchParams.sortBy}
                    onChange={handleSortChange}
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <button className="ml-2" onClick={onToggleDescending}>Toggle</button>
            </div>
            <button onClick={onToggleDescending}>Toggle</button>
        </div>
    );
}

export default ListHeader;