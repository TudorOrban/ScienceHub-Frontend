"use client";

export interface PageSelectorProps {
    currentPage?: number;
    itemsPerPage?: number;
    totalCount?: number;
    onPageChange?: (page: number) => void;
}

const PageSelector = ({
    currentPage = 1,
    itemsPerPage = 2,
    totalCount = 0,
    onPageChange,
}: PageSelectorProps) => {
    if (!totalCount || totalCount <= itemsPerPage || !onPageChange) {
        return null;
    }

    const numberOfPages = Math.ceil(totalCount / itemsPerPage);
    const pageNumbers: Array<number | string> = [];

    for (let i = 1; i <= numberOfPages; i++) {
        if (i === 1 || i === numberOfPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            pageNumbers.push(i);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            pageNumbers.push('...');
        }
    }

    return (
        <div className="flex items-center space-x-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm p-2">
            {pageNumbers.map((page, index) =>
                typeof page === 'number' ? (
                    <button
                        key={index}
                        className={`px-3 py-1 border border-gray-200 rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="px-3 py-1">
                        {page}
                    </span>
                )
            )}
        </div>
    );
}


export default PageSelector;