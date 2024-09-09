export interface Result<T> {
    data?: T;
    error?: StandardAPIError;
    isLoading?: boolean;
}

export interface StandardAPIError {
    title?: string;
    message?: string;
    code?: number;
    detail?: string;
    resourceType?: string;
}