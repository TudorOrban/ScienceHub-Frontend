import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { UserSmall } from "../models/User";
import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";

export const fetchUserSmall = async (userId: string): Promise<Result<UserSmall>> => {
    console.log("fetchUserSmall");
    return await handleAPIRequest<UserSmall>(apiClient.get<UserSmall>(`users/${userId}`));
};