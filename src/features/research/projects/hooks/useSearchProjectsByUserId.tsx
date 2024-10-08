import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { searchProjectsByUserId } from "../services/searchProjectsByUserId";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { ProjectSearchDTO } from "../models/Project";

export const useSearchProjectsByUserId = (userId: number, searchParams: SearchParams, enabled?: boolean, small?: boolean): Result<PaginatedResults<ProjectSearchDTO>> => {
    const queryKey = ["searchProjectsByUserId", userId, searchParams.searchTerm, searchParams.sortBy, searchParams.sortDescending, searchParams.page, searchParams.itemsPerPage];

    const result = useQuery<Result<PaginatedResults<ProjectSearchDTO>>, StandardAPIError>({
        queryKey: queryKey,
        queryFn: () => searchProjectsByUserId(userId, searchParams, small),
        enabled: !!userId && enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? result.data?.error ?? undefined,
        isLoading: result?.isFetching,
    };
};
