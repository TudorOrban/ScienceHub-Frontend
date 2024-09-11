import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { WorkSearchDTO, WorkType } from "../models/Work";
import { searchWorksByUserIdAndWorkType } from "../services/searchWorksByUserIdAndWorkType.ts";

export const useSearchWorksByUserIdAndWorkType = (userId: number, workType: WorkType, searchParams: SearchParams, enabled?: boolean): Result<PaginatedResults<WorkSearchDTO>> => {
    const queryKey = ["searchWorksByUserIdAndWorkType", userId, workType, searchParams.searchTerm, searchParams.sortBy, searchParams.sortDescending, searchParams.page, searchParams.itemsPerPage];

    const result = useQuery<Result<PaginatedResults<WorkSearchDTO>>, StandardAPIError>({
        queryKey: queryKey,
        queryFn: () => searchWorksByUserIdAndWorkType(userId, workType, searchParams),
        enabled: !!userId && enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? result.data?.error ?? undefined,
        isLoading: result?.isFetching,
    };
};
