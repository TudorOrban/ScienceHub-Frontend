import ProjectFeatureBox from "./ProjectFeatureBox";
import { ProjectSearchDTO } from "../models/Project";
import { getProjectCardManagementItems } from "../utils/getProjectCardManagementItems";
import { getProjectCardWorkItems } from "../utils/getProjectCardWorkItems";
import { Feature } from "@/shared/common/models/Features";
import { constructFeatureURL } from "@/shared/utils/featureURLConstructor";

export interface ProjectMediumCardExpansionProps {
    project: ProjectSearchDTO;
}

const ProjectMediumCardExpansion = ({
    project,
}: ProjectMediumCardExpansionProps) => {
    const identifier = constructFeatureURL(Feature.Project, project?.name, project?.users, project?.collaborations);

    const layoutItems = getProjectCardWorkItems(
        identifier ?? "",
        project.name ?? "",
        {
            papersCount: project.papersCount ?? 21,
            experimentsCount: project.experimentsCount ?? 5,
            datasetsCount: project.datasetsCount ?? 1,
            dataAnalysesCount: project.dataAnalysesCount ?? 1,
            aiModelsCount: project.aiModelsCount ?? 2,
            codeBlocksCount: project.codeBlocksCount ?? 6,
        }
    );

    const managementItems = getProjectCardManagementItems(
        identifier ?? "",
        project.name ?? "",
        {
            projectSubmissionsCount: project.projectSubmissionsCount ?? 41,
            projectIssuesCount: project.projectIssuesCount ?? 12,
            projectReviewsCount: project.projectReviewsCount ?? 4,
        }
    );

    return (
        <>
            {/* Project Items */}
            <div className="flex items-start justify-between flex-wrap sm:flex-nowrap px-4 py-2">
                <div>
                    <div className="flex flex-wrap items-center">
                        {layoutItems
                            .filter((item, index) => index < 3)
                            .map((item, index) => (
                                <ProjectFeatureBox
                                    key={`${item.label}-${index}`}
                                    feature={item}
                                />
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center">
                        {layoutItems.length >= 3 &&
                            layoutItems
                                .filter((item, index) => index >= 3)
                                .map((item, index) => (
                                    <ProjectFeatureBox
                                    key={`${item.label}-${index}`}
                                        feature={item}
                                    />
                                ))}
                    </div>
                </div>
                <div className="flex flex-wrap items-center">
                    {managementItems.map((item, index) => (
                        <ProjectFeatureBox
                            key={`${item.label}-${index}`}
                            feature={item}
                        />
                    ))}
                </div>
            </div>
            {/* Fields of research (to be added) */}
            <div className="flex space-x-2 px-6 pb-2">
                <span className="text-sm bg-blue-200 px-2 py-1 border border-gray-100 rounded">Molecular biology</span>
                <span className="text-sm bg-blue-200 px-2 py-1 border border-gray-100 rounded">Machine learning</span>
            </div>
            <div className="flex items-center border-t border-gray-300 px-6 py-3 space-x-2">
                <span className="text-gray-800 text-base font-semibold">
                    Project Description:
                </span>
                <p className="text-gray-600">{project.description}</p>
            </div>
        </>
    );
};

export default ProjectMediumCardExpansion;