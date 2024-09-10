import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import { ProjectSearchDTO } from "../models/Project";
import ProjectMediumCard from "./ProjectMediumCard";
import PageSelector from "@/shared/common/components/PageSelector";
import { StandardAPIError } from "@/shared/http/Http";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import NoResultsFallback from "@/shared/error/components/NoResultsFallback";

export interface ProjectCardListProps {
    data?: PaginatedResults<ProjectSearchDTO>;
    error?: StandardAPIError;
    isLoading?: boolean;
    searchParams?: SearchParams;
    menuStates?: Record<string, string>;
    disableViewMode?: boolean;

    handlePageChange: (page: number) => void;
}

const ProjectCardList = ({
    data,
    error,
    searchParams,
    isLoading,
    menuStates,
    disableViewMode,
    handlePageChange,
}: ProjectCardListProps) => {
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
        <div>
            <div className="page-standard-horizontal-padding py-4 space-y-4">
                {data?.results && data?.results.map(project => (
                    <ProjectMediumCard
                        key={project.id} 
                        project={project} 
                        viewMode={menuStates?.["Expand/Collapse"] === "expanded" ? "expanded" : "collapsed"}
                        isLoading={isLoading}
                        disableViewMode={disableViewMode}
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