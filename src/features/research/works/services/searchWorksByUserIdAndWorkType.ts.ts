import { Result } from "@/shared/http/Http";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { WorkSearchDTO, WorkType } from "../models/Work";

export const searchWorksByUserIdAndWorkType = async (userId: number, workType: WorkType, searchParams: SearchParams): Promise<Result<PaginatedResults<WorkSearchDTO>>> => {
    const request = apiClient.get<PaginatedResults<WorkSearchDTO>>(
        `works/user/${userId}/workType/${workType}/search`, 
        { params: searchParams, }
    );
    return await handleAPIRequest<PaginatedResults<WorkSearchDTO>>(request);
}