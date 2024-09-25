import { Result } from "@/shared/http/Http";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { ChatMessageSearchDTO } from "../models/Chat";

export const searchChatMessagesByUserId = async (chatId: number, searchParams: SearchParams): Promise<Result<PaginatedResults<ChatMessageSearchDTO>>> => {
    const request = apiClient.get<PaginatedResults<ChatMessageSearchDTO>>(
        `chat-messages/user/${chatId}/search`, 
        { 
            params: searchParams,
        }
    );
    return await handleAPIRequest<PaginatedResults<ChatMessageSearchDTO>>(request);
}