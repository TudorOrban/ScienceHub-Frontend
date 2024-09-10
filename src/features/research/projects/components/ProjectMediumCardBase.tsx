import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectSearchDTO } from "../models/Project";
import { faBoxArchive, faCaretDown, faCaretUp, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import UsersAndTeamsUI from "@/shared/common/components/UsersAndTeamsUI";

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
    const userIds = (project?.projectUsers || []).map((user) => user.user.username);
    const collaborationIds = (project?.collaborations || []).map((collaboration) => `T~${collaboration.name}`);
    const identifier = [...userIds, ...collaborationIds].join("~");

    return (
        <div
            className={`flex justify-between items-start flex-wrap sm:flex-nowrap px-6 py-3 bg-gray-50 border-b border-gray-300 ${
                localViewMode === "collapsed" ? "rounded-lg" : "rounded-t-lg"
            }`}
        >
            {/* Left side */}
            <div className="">
                {/* Title and view mode */}
                <div className="flex items-center">
                    <FontAwesomeIcon
                        icon={faBoxArchive}
                        className="small-icon text-gray-700"
                    />
                    {!isLoading && !!project ? (
                        <Link
                            href={`/${identifier}/projects/${project.name}`}
                            className="ml-2 hover:text-blue-600"
                            style={{
                                fontSize: "19px",
                                fontWeight: 500,
                            }}
                        >
                            {project.title}
                        </Link>
                    ) : (
                        <div className="w-full h-10 bg-gray-100 rounded-md shadow-sm">
                        </div>
                    )}
                    {!disableViewMode && (
                        <button
                            onClick={(e) => {
                                setLocalViewMode(
                                    localViewMode === "expanded" ? "collapsed" : "expanded"
                                );
                            }}
                            className="ml-3"
                        >
                            <FontAwesomeIcon
                                icon={localViewMode === "expanded" ? faCaretUp : faCaretDown}
                                className="small-icon text-gray-700 mb-1"
                            />
                        </button>
                    )}
                </div>

                {/* Authors */}
                <div className="flex items-center text-base flex-wrap mt-3 text-gray-600 ">
                    <FontAwesomeIcon className="extra-small-icon mr-2" icon={faUser} />
                    <span className="whitespace-nowrap block">Main Authors:</span>
                    {!isLoading && !!project ? (
                        <UsersAndTeamsUI
                            users={project.users}
                            collaborations={project.collaborations}
                        />
                    ) : (
                        <div className="w-full h-10 bg-gray-100 rounded-md shadow-sm">
                        </div>
                    )}
                </div>
            </div>

            {/* Right side: metrics panel and action buttons */}
            <div className="flex flex-col pt-2 sm:pt-0">
                <div className="flex justify-center sm:justify-end mr-1">
                    {/* <SmallMetricsPanel
                        researchScore={project?.researchScore}
                        hIndex={project?.hIndex}
                        citationsCount={project?.totalCitationsCount}
                        isLoading={isLoading}
                    /> */}
                </div>
                <div className="flex justify-end space-x-3 mt-3 mr-2">
                    {/* <ActionButton
                        icon={faEllipsis}
                        tooltipText={"More Actions"}
                        className="w-8 h-8"
                    />
                    <ActionButton icon={faUpLong} tooltipText={"Upvote"} className="w-8 h-8" />
                    <ActionButton
                        icon={faQuoteRight}
                        tooltipText={"Cite"}
                        className="w-8 h-8"
                    />
                    <ActionButton icon={faShare} tooltipText={"Share"} className="w-8 h-8" /> */}
                    <button className="standard-write-button">
                        <FontAwesomeIcon icon={faPlus} className="small-icon-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectMediumCardBase;