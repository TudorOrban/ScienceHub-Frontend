"use client";

export interface PageSelectorProps {
    currentPage?: number;
    itemsPerPage?: number;
    totalCount?: number;
    onPageChange?: (page: number) => void;
}

const PageSelector = ({
    currentPage,
    itemsPerPage,
    totalCount,
    onPageChange,
}: PageSelectorProps) => {

    return (
        <div>
            Select Page

            
        </div>
    )
}

export default PageSelector;