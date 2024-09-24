import { Result } from "@/shared/http/Http";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { ChatSearchDTO } from "../models/Chat";

export const searchChatsByUserId = async (userId: number, searchParams: SearchParams): Promise<Result<PaginatedResults<ChatSearchDTO>>> => {
    const request = apiClient.get<PaginatedResults<ChatSearchDTO>>(
        `chats/user/${userId}/search`, 
        { params: searchParams, }
    );
    return await handleAPIRequest<PaginatedResults<ChatSearchDTO>>(request);
}