import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { UserSmall } from "../models/User";
import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";

export const searchUsersSmallByUsername = async (searchParams?: SearchParams): Promise<Result<PaginatedResults<UserSmall>>> => {
    const request = apiClient.get<PaginatedResults<UserSmall>>(
        `users/search/username`, 
        { params: searchParams, }
    );
    return await handleAPIRequest<PaginatedResults<UserSmall>>(request);
};