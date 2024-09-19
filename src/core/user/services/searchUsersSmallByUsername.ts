import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { UserSmall } from "../models/User";
import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";
import qs from 'qs';

export const searchUsersSmallByUsername = async (searchTerm: string): Promise<Result<UserSmall[]>> => {
    return await handleAPIRequest<UserSmall[]>(apiClient.get<UserSmall[]>(`users/search/username`, {
        params: { searchTerm },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    }));
};