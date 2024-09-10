import { SearchParams } from "@/shared/search/models/Search";
import SearchInput from "./SearchInput";
import { UIItem } from "../models/UITypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownShortWide, faArrowUpWideShort, faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export interface ListHeaderProps {
    pageTitle: UIItem;
    sortOptions?: UIItem[];
    createNewButtonData?: UIItem;
    addBottom?: boolean;

    searchParams: SearchParams;
    onTermChange?: (term: string) => void;
    onSortOptionChange?: (sortOption: string) => void;
    onToggleDescending?: () => void;
}


const ListHeader = ({
    pageTitle,
    sortOptions = [],
    createNewButtonData,
    addBottom = true,
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
        <div className={`page-standard-horizontal-padding pt-2 ${addBottom ? "border-b border-gray-300 shadow-sm py-4" : ""}`}>
            <div className="flex items-center py-4 space-x-2">
                {pageTitle?.icon && (
                    <FontAwesomeIcon icon={pageTitle.icon} className="small-icon" />
                )}
                {pageTitle?.label && (
                    <h2 className="page-title">
                        {pageTitle.label}
                    </h2>
                )}
            </div>

            <div className="flex items-start justify-between">
                <div className="flex items-center flex-wrap xl:flex-nowrap">
                    <SearchInput searchTerm={searchParams.searchTerm ?? ""} onTermChange={handleTermChange} />

                    <select
                        className="custom-select lg:ml-4"
                        value={searchParams.sortBy}
                        onChange={handleSortChange}
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <button 
                        className="standard-button" 
                        onClick={onToggleDescending}
                    >
                        <FontAwesomeIcon icon={searchParams.sortDescending ? faArrowUpWideShort : faArrowDownShortWide} />
                    </button>
                    
                </div>
                <Link href={createNewButtonData?.link ?? "/not-found"} className="standard-write-button flex items-center space-x-2">
                    <FontAwesomeIcon icon={faPlus} />
                    <p>{createNewButtonData?.label}</p>
                </Link>
            </div>
        </div>
    );
}

export default ListHeader;