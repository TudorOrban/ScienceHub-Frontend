import { UserSmall } from "../models/User";
import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { searchUsersSmallByUsername } from "../services/searchUsersSmallByUsername";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";

export const useSearchUsersSmallByUsername = (searchParams?: SearchParams, enabled?: boolean): Result<PaginatedResults<UserSmall>> => {
    const result = useQuery<Result<PaginatedResults<UserSmall>>, StandardAPIError>({
        queryKey: ["fetchUsersSmall", searchParams?.searchTerm],
        queryFn: () => searchUsersSmallByUsername(searchParams),
        enabled: enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? undefined,
        isLoading: result.isLoading,
    };
};
