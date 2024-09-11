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
import { IssueSearchDTO } from "../models/Issue";

export interface IssuesTableProps {
    data?: PaginatedResults<IssueSearchDTO>;
    error?: StandardAPIError;
    isLoading?: boolean;
    searchParams?: SearchParams;
    menuStates?: Record<string, string>;

    handlePageChange: (page: number) => void;
}

const IssuesTable = ({
    data,
    error,
    searchParams,
    isLoading,
    menuStates,
    handlePageChange,
}: IssuesTableProps) => {
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
                    {data?.results && !isLoading && data?.results.map(issue => (
                        <tr key={issue.id}>
                            <td>
                                {truncateString(issue.title, 28)}
                            </td>
                            <td>
                                <UsersAndCollaborationsUI users={issue.users} collaborations={[]} />
                            </td>
                            <td>
                                {formatDate(issue.createdAt?.toString())}
                            </td>
                            <td className="flex items-center justify-center">
                                <div className="w-32 h-10">
                                    <StandardTag tag={{
                                        label: issue.isPublic ? "Public" : "Private",
                                        value: issue.isPublic ? "public" : "private",
                                        icon: issue.isPublic ? faGlobe : faLock,
                                        iconColor: issue.isPublic ? "rgb(22 163 74)" : "rgb(55 65 81)",
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

export default IssuesTable;