import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { WorkDetailsDTO } from "../models/Work";

export const getWorkById = async (workId: number): Promise<Result<WorkDetailsDTO>> => {
    const request = apiClient.get<WorkDetailsDTO>(`works/${workId}`);
    return await handleAPIRequest<WorkDetailsDTO>(request);
}