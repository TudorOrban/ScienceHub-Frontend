import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { WorkSearchDTO } from "../models/Work";
import { StandardAPIError } from "@/shared/http/Http";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import NoResultsFallback from "@/shared/error/components/NoResultsFallback";
import { formatDate, truncateString } from "@/shared/utils/uiFormatterUtils";
import UsersAndCollaborationsUI from "@/shared/common/components/UsersAndTeamsUI";

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
    console.log(data);
    return (
        <div className="w-full overflow-x-auto">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th className="label-large">Title</th>
                        <th className="label-large">Created At</th>
                        <th className="label-large">Authors</th>
                        <th className="label-large">Public</th>
                    </tr>
                </thead>
                <tbody className="text-base text-center">
                    {data?.results && data?.results.map(work => (
                        <tr key={work.id}>
                            <td>
                                {truncateString(work.title, 20)}
                            </td>
                            <td>
                                <UsersAndCollaborationsUI users={work.users} collaborations={[]} />
                            </td>
                            <td>
                                {formatDate(work.createdAt.toString())}
                            </td>
                            <td>
                                {work.isPublic ? "Yes" : "No"}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default WorksTable;