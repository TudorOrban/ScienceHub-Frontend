import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { CreateIssueDTO, IssueDetailsDTO } from "../models/Issue";

export const createIssue = async (issueDTO: CreateIssueDTO): Promise<Result<IssueDetailsDTO>> => {
    const request = apiClient.post<IssueDetailsDTO>(`issues`, issueDTO);
    return await handleAPIRequest<IssueDetailsDTO>(request);
}