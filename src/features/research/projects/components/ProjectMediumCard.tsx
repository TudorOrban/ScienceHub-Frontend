"use client";

import { useEffect, useState } from "react";
import { ProjectSearchDTO } from "../models/Project";
import {
    faBoxArchive,
    faCaretDown,
    faCaretUp,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faPlus, faQuoteRight, faShare, faUpLong, faUser } from "@fortawesome/free-solid-svg-icons";
import UsersAndTeamsUI from "@/shared/common/components/UsersAndTeamsUI";
import ProjectMediumCardExpansion from "./ProjectMediumCardExpansion";
import ProjectMediumCardBase from "./ProjectMediumCardBase";

export interface ProjectMediumCardProps {
    project?: ProjectSearchDTO;
    viewMode?: "expanded" | "collapsed";
    isLoading?: boolean;
    disableViewMode?: boolean;
}

const ProjectMediumCard = ({
    project,
    viewMode,
    isLoading,
    disableViewMode,
}: ProjectMediumCardProps) => {
    const [localViewMode, setLocalViewMode] = useState<"expanded" | "collapsed">(viewMode ?? "expanded");

    useEffect(() => {
        if (!viewMode) return;
        setLocalViewMode(viewMode);
    }, [viewMode]);

    return (
        <div className="border border-gray-300 w-full shadow-md min-w-fit rounded-lg">
            <ProjectMediumCardBase
                project={project}
                localViewMode={localViewMode}
                setLocalViewMode={setLocalViewMode}
                isLoading={isLoading}
                disableViewMode={disableViewMode}
            />

            {/* Expanded content */}
            {localViewMode === "expanded" && !!project && (
                <ProjectMediumCardExpansion project={project} />
            )}
        </div>
    );
};

export default ProjectMediumCard;