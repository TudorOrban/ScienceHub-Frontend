import { Result } from "@/shared/http/Http";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { DiscussionSearchDTO } from "../models/Discussion";

export const searchDiscussionsByUserId = async (userId: number, searchParams: SearchParams): Promise<Result<PaginatedResults<DiscussionSearchDTO>>> => {
    const request = apiClient.get<PaginatedResults<DiscussionSearchDTO>>(
        `discussions/user/${userId}/search`, 
        { params: searchParams, }
    );
    return await handleAPIRequest<PaginatedResults<DiscussionSearchDTO>>(request);
}