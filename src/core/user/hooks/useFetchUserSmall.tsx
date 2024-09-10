import { UserSmall } from "../models/User";
import { fetchUserSmall } from "../services/fetchUserSmall";
import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserSmall = (userId: string, enabled: boolean = true) => {
    const result = useQuery<Result<UserSmall>, StandardAPIError>({
        queryKey: ["fetchUserSmall", userId],
        queryFn: () => fetchUserSmall(userId),
        enabled: !!userId && enabled,
    });

    return {
        data: result.data?.data,
        error: result.error,
        isLoading: result.isLoading,
    };
};
