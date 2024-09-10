import { UIItem } from "@/shared/common/models/UITypes";
import { faCircleExclamation, faCodeFork, faEdit } from "@fortawesome/free-solid-svg-icons";

export interface ManagementCounts {
    projectSubmissionsCount: number;
    projectIssuesCount: number;
    projectReviewsCount: number;
}

export const getProjectCardManagementItems = (
    identifier: string,
    projectName: string,
    managementCounts?: ManagementCounts,
): UIItem[] => {
    const items: UIItem[] = [
        {
            label: "Submissions",
            icon: faCodeFork,
            iconColor: "#4A4A4A",
            value: (managementCounts?.projectSubmissionsCount ?? 0).toString(),
            link: `/${identifier}/projects/${projectName}/submissions`,
        },
        {
            label: "Issues",
            icon: faCircleExclamation,
            iconColor: "#4A4A4A",
            value: (managementCounts?.projectIssuesCount ?? 0).toString(),
            link: `/${identifier}/projects/${projectName}/issues`,
        },
        {
            label: "Reviews",
            icon: faEdit,
            iconColor: "#4A4A4A",
            value: (managementCounts?.projectReviewsCount ?? 0).toString(),
            link: `/${identifier}/projects/${projectName}/reviews`,
        },
    ];
    return items;
};