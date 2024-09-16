import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { UserSmall } from "../models/User";
import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";
import qs from 'qs';

export const fetchUsersSmallByUsernames = async (usernames: string[]): Promise<Result<UserSmall[]>> => {
    return await handleAPIRequest<UserSmall[]>(apiClient.get<UserSmall[]>(`users/usernames`, {
        params: { usernames },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    }));
};