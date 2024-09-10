import { SearchParams } from "@/shared/search/models/Search";

export interface ListHeaderProps {
    title: string;
    searchParams: SearchParams;
    onToggleDescending?: () => void;
}


const ListHeader = ({
    title,
    searchParams,
    onToggleDescending
}: ListHeaderProps) => {


    
    return (
        <div className="page-standard-horizontal-padding py-6">
            <h2 className="page-title">
                {title}
            </h2>

            

            <button onClick={onToggleDescending}>Toggle</button>
        </div>
    );
}

export default ListHeader;