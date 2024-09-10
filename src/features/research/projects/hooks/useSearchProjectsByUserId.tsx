import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { searchProjectsByUserId } from "../services/searchProjectsByUserId";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { ProjectSearchDTO } from "../models/Project";

export const useSearchProjectsByUserId = (userId: number, searchParams: SearchParams, enabled?: boolean): Result<PaginatedResults<ProjectSearchDTO>> => {
    console.log("Search term: ", searchParams.searchTerm);
    const result = useQuery<Result<PaginatedResults<ProjectSearchDTO>>, StandardAPIError>({
        queryKey: ["searchProjectsByUserId", userId, searchParams.searchTerm, searchParams.sortBy, searchParams.sortDescending, searchParams.page, searchParams.itemsPerPage],
        queryFn: () => searchProjectsByUserId(userId, searchParams),
        enabled: !!userId && enabled,
    });

    return {
        data: result.data?.data,
        error: result.error ?? undefined,
        isLoading: result.isLoading,
    };
};
