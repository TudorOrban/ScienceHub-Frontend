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

    const userIds = (project?.projectUsers || []).map((user) => user.user.username);
    const collaborationIds = (project?.collaborations || []).map((collaboration) => `T~${collaboration.name}`);
    const identifier = [...userIds, ...collaborationIds].join("~");

    useEffect(() => {
        if (!viewMode) return;
        setLocalViewMode(viewMode);
    }, [viewMode]);

    return (
        <div className="border border-gray-300 w-full shadow-md min-w-fit rounded-lg">
            <div
                className={`flex justify-between items-start flex-wrap sm:flex-nowrap px-4 py-3 bg-gray-50 border-b border-gray-300 ${
                    localViewMode === "collapsed" ? "rounded-lg" : "rounded-t-lg"
                }`}
            >
                {/* Left side */}
                <div className="pl-2">
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
                            <>
                                {(project?.users || []).map((user, index) => (
                                    <Link
                                        key={index}
                                        href={`/${user.username}/profile`}
                                        className="ml-1 text-blue-600 hover:text-blue-700 block"
                                    >
                                        {user.fullName}
                                        {index !== (project.users || []).length - 1 ? ", " : ""}
                                    </Link>
                                ))}
                                {(project?.collaborations || []).map((collaboration, index) => (
                                    <Link
                                        key={index}
                                        href={`/${collaboration.name}/profile`}
                                        className="ml-1 text-blue-600 hover:text-blue-700 block"
                                    >
                                        {index !== (project.collaborations || []).length ? ", " : ""}
                                        {collaboration.name}
                                    </Link>
                                ))}
                            </>
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
                            <FontAwesomeIcon icon={faPlus} className="small-icon" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Expanded content */}
            {localViewMode === "expanded" && !!project && (
                <>
                    {/* Project Features */}
                    <div className="flex items-start justify-between flex-wrap sm:flex-nowrap m-2">
                        <div>
                            <div className="flex flex-wrap items-center">
                                {/* {layoutFeatures
                                    .filter((feature, index) => index < 3)
                                    .map((feature, index) => (
                                        <div key={index}>
                                            <FeatureBox
                                                feature={{
                                                    label: feature.label,
                                                    icon: feature.icon,
                                                    iconColor: feature.iconColor,
                                                    value: feature.value,
                                                    link: feature.link,
                                                }}
                                            />
                                        </div>
                                    ))} */}
                            </div>
                            <div className="flex flex-wrap items-center">
                                {/* {layoutFeatures.length >= 3 &&
                                    layoutFeatures
                                        .filter((feature, index) => index >= 3)
                                        .map((feature, index) => (
                                            <div key={index}>
                                                <FeatureBox
                                                    feature={{
                                                        label: feature.label,
                                                        icon: feature.icon,
                                                        iconColor: feature.iconColor,
                                                        value: feature.value,
                                                        link: feature.link,
                                                    }}
                                                />
                                            </div>
                                        ))} */}
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center">
                            {/* {manageFeatures.map((feature, index) => (
                                <div key={index}>
                                    <FeatureBox
                                        feature={{
                                            label: feature.label,
                                            icon: feature.icon,
                                            iconColor: feature.iconColor,
                                            value: feature.value,
                                            link: feature.link,
                                        }}
                                    />
                                </div>
                            ))} */}
                        </div>
                    </div>
                    {/* Fields of research (to be added) */}
                    <div className="flex space-x-2 m-2 py-1 ml-2 mr-4">
                        <span className="text-sm bg-blue-200 p-1 rounded">Molecular biology</span>
                        <span className="text-sm bg-blue-200 p-1 rounded">Machine learning</span>
                    </div>
                    <div className="border-t border-gray-300 p-2 mx-2">
                        <span className="text-gray-800 text-base font-semibold">
                            Project Description:
                        </span>
                        <p className="text-gray-600">{project.description}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProjectMediumCard;