import { Result } from "@/shared/http/Http";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { IssueSearchDTO, IssueType } from "../models/Issue";

export const searchIssuesByUserIdAndIssueType = async (userId: number, issueType: IssueType, searchParams: SearchParams): Promise<Result<PaginatedResults<IssueSearchDTO>>> => {
    const request = apiClient.get<PaginatedResults<IssueSearchDTO>>(
        `issues/issueType/${issueType}/user/${userId}/search`, 
        { params: searchParams, }
    );
    return await handleAPIRequest<PaginatedResults<IssueSearchDTO>>(request);
}