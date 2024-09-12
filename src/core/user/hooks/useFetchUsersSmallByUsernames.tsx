import { UserSmall } from "../models/User";
import { fetchUsersSmallByUsernames } from "../services/fetchUsersSmallByUsernames";
import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsersSmallByUsernames = (usernames: string[], enabled?: boolean): Result<UserSmall[]> => {
    const result = useQuery<Result<UserSmall[]>, StandardAPIError>({
        queryKey: ["fetchUsersSmall", usernames.join(",")],
        queryFn: () => fetchUsersSmallByUsernames(usernames),
        enabled: !!usernames && enabled,
    });

    return {
        data: result.data?.data,
        error: result.error ?? undefined,
        isLoading: result.isLoading,
    };
};
