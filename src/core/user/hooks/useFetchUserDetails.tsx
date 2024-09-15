import { UserDetailsDTO } from "../models/User";
import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "../services/fetchUserDetails";

export const useFetchUserDetails = (userId: number, enabled?: boolean): Result<UserDetailsDTO> => {
    const result = useQuery<Result<UserDetailsDTO>, StandardAPIError>({
        queryKey: ["fetchUserDetails", userId],
        queryFn: () => fetchUserDetails(userId),
        enabled: !!userId && enabled,
    });

    console.log("Result: ", result?.data);
    return {
        data: result.data?.data,
        error: result.error ?? undefined,
        isLoading: result.isLoading,
    };
};
