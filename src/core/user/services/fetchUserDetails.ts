import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { UserDetails } from "../models/User";
import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";

export const fetchUserDetails = async (userId: number): Promise<Result<UserDetails>> => {
    return await handleAPIRequest<UserDetails>(apiClient.get<UserDetails>(`users/${userId}/details`));
};