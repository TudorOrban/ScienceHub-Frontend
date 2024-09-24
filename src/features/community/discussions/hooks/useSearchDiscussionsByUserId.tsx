import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { searchDiscussionsByUserId } from "../services/searchDiscussionsByUserId";
import { DiscussionSearchDTO } from "../models/Discussion";

export const useSearchDiscussionsByUserId = (userId: number, searchParams: SearchParams, enabled?: boolean): Result<PaginatedResults<DiscussionSearchDTO>> => {
    const queryKey = ["searchDiscussionsByUserId", userId, searchParams.searchTerm, searchParams.sortBy, searchParams.sortDescending, searchParams.page, searchParams.itemsPerPage];

    const result = useQuery<Result<PaginatedResults<DiscussionSearchDTO>>, StandardAPIError>({
        queryKey: queryKey,
        queryFn: () => searchDiscussionsByUserId(userId, searchParams),
        enabled: !!userId && enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? result.data?.error ?? undefined,
        isLoading: result?.isFetching,
    };
};
