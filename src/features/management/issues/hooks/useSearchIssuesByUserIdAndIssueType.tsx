import { Result, StandardAPIError } from "@/shared/http/Http";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { IssueSearchDTO, IssueType } from "../models/Issue";
import { searchIssuesByUserIdAndIssueType } from "../services/searchIssuesByUserIdAndIssueType";

export const useSearchIssuesByUserIdAndIssueType = (userId: number, issueType: IssueType, searchParams: SearchParams, enabled?: boolean): Result<PaginatedResults<IssueSearchDTO>> => {
    const queryKey = ["searchIssuesByUserIdAndIssueType", userId, issueType, searchParams.searchTerm, searchParams.sortBy, searchParams.sortDescending, searchParams.page, searchParams.itemsPerPage];

    const result = useQuery<Result<PaginatedResults<IssueSearchDTO>>, StandardAPIError>({
        queryKey: queryKey,
        queryFn: () => searchIssuesByUserIdAndIssueType(userId, issueType, searchParams),
        enabled: !!userId && enabled,
        staleTime: 60 * 1000,
    });

    return {
        data: result.data?.data,
        error: result.error ?? result.data?.error ?? undefined,
        isLoading: result?.isFetching,
    };
};
