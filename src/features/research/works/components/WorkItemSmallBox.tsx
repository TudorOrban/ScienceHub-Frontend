
import { UIItem } from "@/shared/common/models/UITypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

type WorkFeatureSmallBoxProps = {
    feature: UIItem;
    className?: string;
    children?: React.ReactNode;
    useText?: boolean;
};

const ProjectFeatureBox: React.FC<WorkFeatureSmallBoxProps> = ({
    feature,
    className = "",
    useText = true,
}) => {
    return (
        <div
            className={`border-2 border-gray-300 rounded-lg flex flex-shrink-0 text-sm mx-1 my-1 ${className}`}
        >
            <div className={`flex items-center px-2 py-1`}>
                {feature.icon && (
                    <FontAwesomeIcon
                        icon={feature.icon}
                        color={feature.iconColor}
                        className="w-3 h-3 mr-1"
                    />
                )}
                {feature.link ? (
                    <Link href={feature.link}>
                        {useText ? (
                            <span className="flex whitespace-nowrap hover:text-blue-700 px-1">
                                {feature.label}
                            </span>
                        ) : null}
                    </Link>
                ) : (
                    <span className="flex whitespace-nowrap px-1">
                        {feature.label}
                    </span>
                )}
            </div>
            <div
                className={`border-l border-gray-400 font-semibold px-2 py-1`}
            >
                {feature.value}
            </div>
        </div>
    );
};

export default ProjectFeatureBox;
