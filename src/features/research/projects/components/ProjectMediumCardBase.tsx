import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectSearchDTO } from "../models/Project";
import { faEllipsis, faPlus, faShare, faUpLong, faUser } from "@fortawesome/free-solid-svg-icons";
import UsersAndCollaborationsUI from "@/shared/common/components/UsersAndTeamsUI";
import SmallMetricsPanel from "./SmallMetricsPanel";
import ProjectMediumCardTitle from "./ProjectMediumCardTitle";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";

export interface ProjectMediumCardBaseProps {
    project?: ProjectSearchDTO;
    localViewMode: "expanded" | "collapsed";
    setLocalViewMode: (viewMode: "expanded" | "collapsed") => void;
    isLoading?: boolean;
    disableViewMode?: boolean;
}

const ProjectMediumCardBase = ({
    project,
    localViewMode,
    setLocalViewMode,
    isLoading,
    disableViewMode,
}: ProjectMediumCardBaseProps) => {

    return (
        <div
            className={`flex justify-between items-start flex-wrap sm:flex-nowrap px-6 py-4 space-x-4 bg-gray-50 border-b border-gray-300 ${
                localViewMode === "collapsed" ? "rounded-lg" : "rounded-t-lg"
            }`}
        >
            {/* Left side */}
            <div className="space-y-4">
                {/* Title and view mode */}
                <ProjectMediumCardTitle
                    project={project}
                    localViewMode={localViewMode}
                    setLocalViewMode={setLocalViewMode}
                    isLoading={isLoading}
                    disableViewMode={disableViewMode}
                />

                {/* Authors */}
                <div className="flex items-center text-base flex-wrap mt-3 text-gray-600 ">
                    <FontAwesomeIcon className="extra-small-icon mr-2" icon={faUser} />
                    <span className="whitespace-nowrap block">Main Authors:</span>
                    {!isLoading && !!project ? (
                        <UsersAndCollaborationsUI
                            users={project.users}
                            collaborations={project.collaborations}
                        />
                    ) : (
                        <LoadingSkeleton isLoading={isLoading}/>
                    )}
                </div>
            </div>

            {/* Right side: metrics panel and action buttons */}
            <div className="flex flex-col pt-2 sm:pt-0">
                <div className="flex justify-center sm:justify-end mr-1">
                    <SmallMetricsPanel
                        researchScore={project?.researchScore}
                        hIndex={project?.hIndex}
                        citationsCount={project?.totalCitationsCount}
                        isLoading={isLoading}
                    />
                </div>
                <div className="flex justify-end space-x-3 mt-3 mr-2">
                    <button className="standard-button flex items-center justify-center w-9">
                        <FontAwesomeIcon icon={faEllipsis} className="small-icon" />
                    </button>
                    <button className="standard-button flex items-center justify-center w-9">
                        <FontAwesomeIcon icon={faUpLong} className="small-icon" />
                    </button>
                    <button className="standard-button flex items-center justify-center w-9">
                        <FontAwesomeIcon icon={faShare} className="small-icon" />
                    </button>
                    <button className="standard-write-button">
                        <FontAwesomeIcon icon={faPlus} className="small-icon-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectMediumCardBase;