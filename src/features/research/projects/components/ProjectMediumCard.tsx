"use client";

import { ProjectSearchDTO } from "../models/Project";

export interface ProjectMediumCardProps {
    project?: ProjectSearchDTO;
}

const ProjectMediumCard = ({
    project
}: ProjectMediumCardProps) => {
    return (
        <div>
            {project?.name}
        </div>
    );
};

export default ProjectMediumCard;