import { ProjectSearchDTO } from "../models/Project";

export interface ProjectMediumCardExpansionProps {
    project: ProjectSearchDTO;
}

const ProjectMediumCardExpansion = ({
    project,
}: ProjectMediumCardExpansionProps) => {

    return (
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
    );
};

export default ProjectMediumCardExpansion;