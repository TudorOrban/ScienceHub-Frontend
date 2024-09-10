
export interface PaginatedResults<T> {
    results: T[];
    totalCount: number;
}

export interface SearchParams {
    searchTerm?: string;
    sortBy?: string;
    sortDescending?: boolean;
    filters?: Record<string, string>;
    page?: number;
    itemsPerPage?: number;
}