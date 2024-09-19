import { UserSmall } from "../models/User";
import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { searchUsersSmallByUsername } from "../services/searchUsersSmallByUsername";

export const useSearchUsersSmallByUsername = (searchTerm?: string, enabled?: boolean): Result<UserSmall[]> => {
    const result = useQuery<Result<UserSmall[]>, StandardAPIError>({
        queryKey: ["fetchUsersSmall", searchTerm],
        queryFn: () => searchUsersSmallByUsername(searchTerm ?? ""),
        enabled: !!searchTerm && enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? undefined,
        isLoading: result.isLoading,
    };
};
