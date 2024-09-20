import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { CreateWorkDTO, WorkDetailsDTO } from "../models/Work";

export const createWork = async (workDTO: CreateWorkDTO): Promise<Result<WorkDetailsDTO>> => {
    const request = apiClient.post<WorkDetailsDTO>(`works`, workDTO);
    return await handleAPIRequest<WorkDetailsDTO>(request);
}