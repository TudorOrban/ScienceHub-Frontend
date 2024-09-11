import { Result } from "@/shared/http/Http";
import { ProjectSearchDTO } from "../models/Project"
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";

export const searchProjectsByUserId = async (userId: number, searchParams: SearchParams): Promise<Result<PaginatedResults<ProjectSearchDTO>>> => {
    const request = apiClient.get<PaginatedResults<ProjectSearchDTO>>(
        `projects/user/${userId}`, 
        { params: searchParams, }
    );
    return await handleAPIRequest<PaginatedResults<ProjectSearchDTO>>(request);
}