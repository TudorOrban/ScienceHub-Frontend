import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { UserSmall } from "../models/User";
import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";

export const fetchUserSmall = async (userId: number): Promise<Result<UserSmall>> => {
    return await handleAPIRequest<UserSmall>(apiClient.get<UserSmall>(`users/${userId}/small`));
};