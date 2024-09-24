import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { searchChatsByUserId } from "../services/searchChatsByUserId";
import { ChatSearchDTO } from "../models/Chat";

export const useSearchChatsByUserId = (userId: number, searchParams: SearchParams, enabled?: boolean): Result<PaginatedResults<ChatSearchDTO>> => {
    const queryKey = ["searchChatsByUserId", userId, searchParams.searchTerm, searchParams.sortBy, searchParams.sortDescending, searchParams.page, searchParams.itemsPerPage];

    const result = useQuery<Result<PaginatedResults<ChatSearchDTO>>, StandardAPIError>({
        queryKey: queryKey,
        queryFn: () => searchChatsByUserId(userId, searchParams),
        enabled: !!userId && enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? result.data?.error ?? undefined,
        isLoading: result?.isFetching,
    };
};
