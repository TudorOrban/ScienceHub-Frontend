import { UIItem } from "@/shared/common/models/UITypes";
import { faChartSimple, faClipboard, faCode, faDatabase, faFlask, faMicrochip } from "@fortawesome/free-solid-svg-icons";

export interface WorkCounts {
    experimentsCount: number;
    datasetsCount: number;
    dataAnalysesCount: number;
    aiModelsCount: number;
    codeBlocksCount: number;
    papersCount: number;
}

export const getProjectCardWorkItems = (
    identifier: string,
    projectName: string,
    workCounts?: WorkCounts,
): UIItem[] => {
    const items: UIItem[] = [
        {
            label: "Papers",
            icon: faClipboard,
            iconColor: "#4A4A4A",
            value: (workCounts?.papersCount ?? 0).toString(),
            link: `/${identifier}/projects/${projectName}/papers`,
        },
        {
            label: "Experiments",
            icon: faFlask,
            iconColor: "#2E3A87",
            value: (workCounts?.experimentsCount ?? 0).toString(),
            link: `/${identifier}/projects/${projectName}/experiments`,
        },
        {
            label: "Datasets",
            icon: faDatabase,
            iconColor: "#1A8E34",
            value: (workCounts?.datasetsCount ?? 0).toString(),
            link: `/${identifier}/projects/${projectName}/datasets`,
        },
        {
            label: "Data Analyses",
            icon: faChartSimple,
            iconColor: "#8B2DAE",
            value: (workCounts?.dataAnalysesCount ?? 0).toString(),
            link: `/${identifier}/projects/${projectName}/data-analyses`,
        },
        {
            label: "AI Models",
            icon: faMicrochip,
            iconColor: "#DAA520",
            value: (workCounts?.aiModelsCount ?? 0).toString(),
            link: `/${identifier}/projects/${projectName}/experiments`,
        },
        {
            label: "Code Blocks",
            icon: faCode,
            iconColor: "#C82333",
            value: (workCounts?.codeBlocksCount ?? 0).toString(),
            link: `/${identifier}/projects/${projectName}/code-blocks`,
        },
    ];
    return items;
};