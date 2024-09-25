import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { StandardAPIError } from "@/shared/http/Http";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import NoResultsFallback from "@/shared/error/components/NoResultsFallback";
import PageSelector from "@/shared/common/components/PageSelector";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import { ChatSearchDTO } from "../models/Chat";
import ChatMediumCard from "./ChatMediumCard";

export interface ChatsTableProps {
    data?: PaginatedResults<ChatSearchDTO>;
    error?: StandardAPIError;
    isLoading?: boolean;
    searchParams?: SearchParams;

    handlePageChange: (page: number) => void;
}

const ChatCardList = ({
    data,
    error,
    searchParams,
    isLoading,
    handlePageChange,
}: ChatsTableProps) => {
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
            <div className="">
                {data?.results?.map((chat) => (
                    <ChatMediumCard key={chat.id} chat={chat} />
                ))}
            </div>

            <div className="flex justify-end page-standard-horizontal-padding">
                <PageSelector currentPage={searchParams?.page} itemsPerPage={searchParams?.itemsPerPage} totalCount={data?.totalCount ?? 0} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default ChatCardList;