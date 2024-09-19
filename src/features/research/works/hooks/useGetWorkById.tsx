import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { WorkDetailsDTO } from "../models/Work";
import { getWorkById } from "../services/getWorkById";

export const useGetWorkById = (workId: number, enabled?: boolean): Result<WorkDetailsDTO> => {
    const queryKey = ["searchWorksByUserIdAndWorkType", workId];

    const result = useQuery<Result<WorkDetailsDTO>, StandardAPIError>({
        queryKey: queryKey,
        queryFn: () => getWorkById(workId),
        enabled: !!workId && enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? result.data?.error ?? undefined,
        isLoading: result?.isFetching,
    };
};
