import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { WorkDetails } from "../models/Work";
import { getWorkById } from "../services/getWorkById";

export const useGetWorkById = (workId: number, enabled?: boolean): Result<WorkDetails> => {
    const queryKey = ["searchWorksByUserIdAndWorkType", workId];

    const result = useQuery<Result<WorkDetails>, StandardAPIError>({
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
