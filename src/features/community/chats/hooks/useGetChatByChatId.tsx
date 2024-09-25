import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { ChatSearchDTO } from "../models/Chat";
import { getChatByChatId } from "../services/getChatByChatId";

export const useGetChatByChatId = (chatId: number, enabled?: boolean): Result<ChatSearchDTO> => {
    const queryKey = ["searchChatsByUserId", chatId];

    const result = useQuery<Result<ChatSearchDTO>, StandardAPIError>({
        queryKey: queryKey,
        queryFn: () => getChatByChatId(chatId),
        enabled: !!chatId && enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? result.data?.error ?? undefined,
        isLoading: result?.isFetching,
    };
};
