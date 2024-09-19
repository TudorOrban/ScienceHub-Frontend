import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { WorkSearchDTO } from "../models/Work";
import { StandardAPIError } from "@/shared/http/Http";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import NoResultsFallback from "@/shared/error/components/NoResultsFallback";
import { formatDate, truncateString } from "@/shared/utils/uiFormatterUtils";
import UsersAndCollaborationsUI from "@/shared/common/components/UsersAndTeamsUI";
import PageSelector from "@/shared/common/components/PageSelector";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import StandardTag from "@/shared/common/components/simple/StandardTag";
import { faGlobe, faLock } from "@fortawesome/free-solid-svg-icons";
import { Feature } from "@/shared/common/models/Features";
import { constructFeatureURL } from "@/shared/utils/featureURLConstructor";
import Link from "next/link";

export interface WorksTableProps {
    data?: PaginatedResults<WorkSearchDTO>;
    error?: StandardAPIError;
    isLoading?: boolean;
    searchParams?: SearchParams;
    menuStates?: Record<string, string>;

    handlePageChange: (page: number) => void;
}

const WorksTable = ({
    data,
    error,
    searchParams,
    isLoading,
    menuStates,
    handlePageChange,
}: WorksTableProps) => {
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
                    {data?.results && !isLoading && data?.results.map(work => (
                        <tr key={work.id}>
                            <td>
                                <Link href={constructFeatureURL(Feature.Work, work?.id.toString(), work?.users, [])} className="pseudo-link font-medium">
                                    {truncateString(work.title, 28)}
                                </Link>
                            </td>
                            <td>
                                <UsersAndCollaborationsUI users={work.users} collaborations={[]} />
                            </td>
                            <td>
                                {formatDate(work.createdAt.toString())}
                            </td>
                            <td className="flex items-center justify-center">
                                <div className="w-32 h-10">
                                    <StandardTag tag={{
                                        label: work.isPublic ? "Public" : "Private",
                                        value: work.isPublic ? "public" : "private",
                                        icon: work.isPublic ? faGlobe : faLock,
                                        iconColor: work.isPublic ? "rgb(22 163 74)" : "rgb(220 38 38)",
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

export default WorksTable;