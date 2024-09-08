import { UserSmall } from "@/core/user/models/User";

export interface ProjectSmall {
    id: number;
    title: string;
    name: string;
}

export interface ProjectMedium {
    id: number;
    title: string;
    name: string;
    currentProjectVersionId?: number;
    users?: UserSmall[];
}

export interface ProjectSearchDTO {
    id: number;
    title: string;
    name: string;
    description?: string;
    currentProjectVersionId?: number;
    projectUsers?: ProjectUserSearchDTO[];
    users?: UserSmall[];

    experimentsCount?: number;
    datasetsCount?: number;
    dataAnalysesCount?: number;
    aiModelsCount?: number;
    papersCount?: number;
    codeBlocksCount?: number;
    projectSubmissionsCount?: number;
    projectSubmissionsRequestsCount?: number;
    projectIssuesCount?: number;
    projectReviewsCount?: number;
    researchScore?: number;
    hIndex?: number;
    totalCitationsCount?: number;
}

export interface ProjectUserSearchDTO {
    projectId: number;
    userId: string;
    role: string;
    user: UserSearchDTO;
}

export interface UserSearchDTO {
    id: string;
    username: string;
    fullName: string;
}
