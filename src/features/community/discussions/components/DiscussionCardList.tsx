import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { StandardAPIError } from "@/shared/http/Http";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import NoResultsFallback from "@/shared/error/components/NoResultsFallback";
import PageSelector from "@/shared/common/components/PageSelector";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import { DiscussionSearchDTO } from "../models/Discussion";
import DiscussionMediumCard from "./DiscussionMediumCard";

export interface DiscussionsTableProps {
    data?: PaginatedResults<DiscussionSearchDTO>;
    error?: StandardAPIError;
    isLoading?: boolean;
    searchParams?: SearchParams;
    menuStates?: Record<string, string>;

    handlePageChange: (page: number) => void;
}

const DiscussionCardList = ({
    data,
    error,
    searchParams,
    isLoading,
    menuStates,
    handlePageChange,
}: DiscussionsTableProps) => {
    if (!!error) {
        return (
            <ErrorFallback error={error} />
        )
    }

    if (data?.results?.length === 0) {
        return (
            <NoResultsFallback />
        );
    }

    if (isLoading) {
        return (
            <div className="w-full overflow-x-hidden page-standard-horizontal-padding py-4 space-y-4">
                {isLoading && [...Array(6).keys()].map((key) => (
                    <LoadingSkeleton key={key} isLoading={isLoading} className="h-24"/>
                ))}
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <div className="page-standard-horizontal-padding py-4 space-y-4">
                {data?.results?.map((discussion) => (
                    <DiscussionMediumCard key={discussion.id} discussion={discussion} />
                ))}
            </div>

            <div className="flex justify-end page-standard-horizontal-padding">
                <PageSelector currentPage={searchParams?.page} itemsPerPage={searchParams?.itemsPerPage} totalCount={data?.totalCount ?? 0} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default DiscussionCardList;