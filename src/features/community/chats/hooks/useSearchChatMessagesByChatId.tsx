import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { ChatMessageSearchDTO } from "../models/Chat";
import { searchChatMessagesByUserId } from "../services/searchChatMessagesByChatId";

export const useSearchChatMessagesByChatId = (chatId: number, searchParams: SearchParams, enabled?: boolean): Result<PaginatedResults<ChatMessageSearchDTO>> => {
    const queryKey = ["searchChatMessagesByChatId", chatId, searchParams.searchTerm, searchParams.sortBy, searchParams.sortDescending, searchParams.page, searchParams.itemsPerPage];

    const result = useQuery<Result<PaginatedResults<ChatMessageSearchDTO>>, StandardAPIError>({
        queryKey: queryKey,
        queryFn: () => searchChatMessagesByUserId(chatId, searchParams),
        enabled: !!chatId && enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? result.data?.error ?? undefined,
        isLoading: result?.isFetching,
    };
};
