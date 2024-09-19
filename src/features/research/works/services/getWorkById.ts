import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { WorkDetails } from "../models/Work";

export const getWorkById = async (workId: number): Promise<Result<WorkDetails>> => {
    const request = apiClient.get<WorkDetails>(`works/${workId}`);
    return await handleAPIRequest<WorkDetails>(request);
}