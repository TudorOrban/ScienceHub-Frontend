import { SearchParams } from "@/shared/search/models/Search";
import SearchInput from "./SearchInput";

export interface ListHeaderProps {
    title: string;
    searchParams: SearchParams;
    onTermChange?: (term: string) => void;
    onToggleDescending?: () => void;
}


const ListHeader = ({
    title,
    searchParams,
    onTermChange,
    onToggleDescending
}: ListHeaderProps) => {

    const handleTermChange = (term: string) => {
        console.log(term);

        onTermChange?.(term);
    }

    
    return (
        <div className="page-standard-horizontal-padding py-6">
            <h2 className="page-title">
                {title}
            </h2>

            <SearchInput searchTerm={searchParams.searchTerm ?? ""} onTermChange={handleTermChange} />

            <button onClick={onToggleDescending}>Toggle</button>
        </div>
    );
}

export default ListHeader;