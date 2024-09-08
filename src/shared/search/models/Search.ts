
export interface PaginatedResults<T> {
    results: T[];
    totalCount: number;
}

export interface SearchParams {
    searchQuery?: string;
    sortBy?: string;
    isDescending?: boolean;
    filters?: Record<string, string>;
    page?: number;
    itemsPerPage?: number;
}