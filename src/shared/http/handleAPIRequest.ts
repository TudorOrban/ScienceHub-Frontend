import axios, { AxiosResponse } from "axios";
import { Result, StandardAPIError } from "./Http";

export async function handleAPIRequest<T>(request: Promise<AxiosResponse<T>>): Promise<Result<T>> {
    try {
        const response = await request;
        return { data: response.data, error: undefined, isLoading: false };
    } catch (error) {
        let standardError: StandardAPIError = {
            message: "An unexpected error occurred",
            resourceType: "Unknown",
        };

        if (axios.isAxiosError(error) && error.response) {
            const responseData = error.response.data as StandardAPIError;
            standardError = {
                title: responseData.title || error.response.statusText,
                message: responseData.message || "An error occurred",
                code: error.response.status,
                detail: responseData.detail,
                resourceType: error.config?.url,
            };
        } else {
            standardError.message = "Network or unknown error";
        }

        return { data: undefined, error: standardError, isLoading: false };
    }
}
