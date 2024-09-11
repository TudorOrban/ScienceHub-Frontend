import { UserSmall } from "@/core/user/models/User";
import { WorkType } from "@/features/research/works/models/Work";

export interface ReviewSearchDTO {
    id: number;
    reviewType: ReviewType;
    projectId?: number;
    workId?: number;
    workType?: WorkType;
    name: string;
    title: string;
    description?: string;
    createdAt?: string;
    isPublic?: boolean;
    status?: ReviewStatus;
    users?: UserSmall[];
}

export enum ReviewType {
    ProjectReview = "ProjectReview",
    WorkReview = "WorkReview",
}

export enum ReviewStatus {
    InProgress = "InProgress",
    Submitted = "Submitted",
}
