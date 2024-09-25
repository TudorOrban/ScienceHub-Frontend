import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { ChatSearchDTO } from "../models/Chat";

export const getChatByChatId = async (chatId: number, addUsers?: boolean): Promise<Result<ChatSearchDTO>> => {
    const request = apiClient.get<ChatSearchDTO>(
        `chats/${chatId}`,
        {
            params: {
                addUsers: addUsers ?? true,
            },
    });
    return await handleAPIRequest<ChatSearchDTO>(request);
}