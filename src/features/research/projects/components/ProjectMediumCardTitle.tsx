import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectSearchDTO } from "../models/Project";
import { faBoxArchive, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import { constructFeatureURL } from "@/shared/utils/featureURLConstructor";
import { Feature } from "@/shared/common/models/Features";

export interface ProjectMediumCardTitleProps {
    project?: ProjectSearchDTO;
    localViewMode: "expanded" | "collapsed";
    setLocalViewMode: (viewMode: "expanded" | "collapsed") => void;
    isLoading?: boolean;
    disableViewMode?: boolean;
}

const ProjectMediumCardTitle = ({
    project,
    localViewMode,
    setLocalViewMode,
    isLoading,
    disableViewMode,
}: ProjectMediumCardTitleProps) => {
    const featureURL = constructFeatureURL(Feature.Project, project?.name, project?.users, project?.collaborations);

    return (
        <div className="flex items-center">
            <FontAwesomeIcon
                icon={faBoxArchive}
                className="small-icon text-gray-700"
            />
            {!isLoading && !!project ? (
                <Link
                    href={featureURL}
                    className="ml-2 hover:text-blue-600"
                    style={{
                        fontSize: "19px",
                        fontWeight: 500,
                    }}
                >
                    {project.title}
                </Link>
            ) : (
                <LoadingSkeleton isLoading={isLoading} />
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
    );
};

export default ProjectMediumCardTitle;