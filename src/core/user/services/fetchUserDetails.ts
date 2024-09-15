import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { UserDetailsDTO } from "../models/User";
import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";

export const fetchUserDetails = async (userId: number): Promise<Result<UserDetailsDTO>> => {
    return await handleAPIRequest<UserDetailsDTO>(apiClient.get<UserDetailsDTO>(`users/${userId}/details`));
};