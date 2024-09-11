import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { ReviewSearchDTO, ReviewType } from "../models/Review";
import { searchReviewsByUserIdAndReviewType } from "../services/searchReviewsByUserIdAndReviewType";

export const useSearchReviewsByUserIdAndReviewType = (userId: number, reviewType: ReviewType, searchParams: SearchParams, enabled?: boolean): Result<PaginatedResults<ReviewSearchDTO>> => {
    const queryKey = ["searchReviewsByUserIdAndReviewType", userId, reviewType, searchParams.searchTerm, searchParams.sortBy, searchParams.sortDescending, searchParams.page, searchParams.itemsPerPage];

    const result = useQuery<Result<PaginatedResults<ReviewSearchDTO>>, StandardAPIError>({
        queryKey: queryKey,
        queryFn: () => searchReviewsByUserIdAndReviewType(userId, reviewType, searchParams),
        enabled: !!userId && enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? result.data?.error ?? undefined,
        isLoading: result?.isFetching,
    };
};
