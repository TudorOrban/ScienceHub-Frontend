import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { ProjectSearchDTO } from "../models/Project";
import ProjectMediumCard from "./ProjectMediumCard";
import PageSelector from "@/shared/common/components/PageSelector";
import { StandardAPIError } from "@/shared/http/Http";
import ErrorFallback from "@/shared/error/components/ErrorFallback";

export interface ProjectCardListProps {
    data?: PaginatedResults<ProjectSearchDTO>;
    error?: StandardAPIError;
    isLoading?: boolean;
    searchParams?: SearchParams;
    menuStates?: Record<string, string>;

    handlePageChange: (page: number) => void;
}

const ProjectCardList = ({
    data,
    error,
    searchParams,
    isLoading,
    menuStates,
    handlePageChange,
}: ProjectCardListProps) => {
    if (!!error) {
        return (
            <ErrorFallback error={error} />
        )
    }

    return (
        <div>
            <div className="page-standard-horizontal-padding py-4 space-y-4">
                {!isLoading && data?.results && data?.results.map(project => (
                    <ProjectMediumCard
                        key={project.id} 
                        project={project} 
                        viewMode={menuStates?.["Expand/Collapse"] === "expanded" ? "expanded" : "collapsed"}
                    />
                ))}
            </div>

            <div className="flex justify-end page-standard-horizontal-padding">
                <PageSelector currentPage={searchParams?.page} itemsPerPage={searchParams?.itemsPerPage} totalCount={data?.totalCount ?? 0} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};


export default ProjectCardList;