import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { StandardAPIError } from "@/shared/http/Http";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import NoResultsFallback from "@/shared/error/components/NoResultsFallback";
import { formatDate, truncateString } from "@/shared/utils/uiFormatterUtils";
import UsersAndCollaborationsUI from "@/shared/common/components/UsersAndTeamsUI";
import PageSelector from "@/shared/common/components/PageSelector";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import StandardTag from "@/shared/common/components/simple/StandardTag";
import { faGlobe, faLock } from "@fortawesome/free-solid-svg-icons";
import { ReviewSearchDTO } from "../models/Review";
import Link from "next/link";
import { constructFeatureURL } from "@/shared/utils/featureURLConstructor";
import { Feature } from "@/shared/common/models/Features";

export interface ReviewsTableProps {
    data?: PaginatedResults<ReviewSearchDTO>;
    error?: StandardAPIError;
    isLoading?: boolean;
    searchParams?: SearchParams;
    menuStates?: Record<string, string>;

    handlePageChange: (page: number) => void;
}

const ReviewsTable = ({
    data,
    error,
    searchParams,
    isLoading,
    menuStates,
    handlePageChange,
}: ReviewsTableProps) => {
    if (!!error) {
        return (
            <ErrorFallback error={error} />
        )
    }

    if (data?.results.length === 0) {
        return (
            <NoResultsFallback />
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th className="label-large">Title</th>
                        <th className="label-large">Authors</th>
                        <th className="label-large">Created At</th>
                        <th className="label-large">Visibility</th>
                    </tr>
                </thead>
                <tbody className="">
                    {data?.results && !isLoading && data?.results.map(review => (
                        <tr key={review.id}>
                            <td>
                                <Link href={constructFeatureURL(Feature.Review, review?.title, review?.users, [])} className="pseudo-link font-medium">
                                    {truncateString(review.title, 28)}
                                </Link>
                            </td>
                            <td>
                                <UsersAndCollaborationsUI users={review.users} collaborations={[]} />
                            </td>
                            <td>
                                {formatDate(review.createdAt?.toString())}
                            </td>
                            <td className="flex items-center justify-center">
                                <div className="w-32 h-10">
                                    <StandardTag tag={{
                                        label: review.isPublic ? "Public" : "Private",
                                        value: review.isPublic ? "public" : "private",
                                        icon: review.isPublic ? faGlobe : faLock,
                                        iconColor: review.isPublic ? "rgb(22 163 74)" : "rgb(55 65 81)",
                                    }} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="w-full overflow-x-hidden p-4 space-y-4">
                {isLoading && [...Array(6).keys()].map((key) => (
                    <LoadingSkeleton key={key} isLoading={isLoading} className="h-16"/>
                ))}
            </div>

            <div className="flex justify-end page-standard-horizontal-padding">
                <PageSelector currentPage={searchParams?.page} itemsPerPage={searchParams?.itemsPerPage} totalCount={data?.totalCount ?? 0} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default ReviewsTable;