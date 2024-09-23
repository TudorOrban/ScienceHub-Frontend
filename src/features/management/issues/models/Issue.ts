import { UserSmall } from "@/core/user/models/User";
import { WorkType } from "@/features/research/works/models/Work";

export interface IssueSearchDTO {
    id: number;
    issueType: IssueType;
    projectId?: number;
    workId?: number;
    workType?: WorkType;
    title: string;
    description?: string;
    createdAt?: string;
    isPublic?: boolean;
    status?: IssueStatus;
    users?: UserSmall[];
}

export enum IssueType {
    ProjectIssue = "ProjectIssue",
    WorkIssue = "WorkIssue",
}

export enum IssueStatus {
    Open = "Open",
    Closed = "Closed",
}

export interface IssueDetailsDTO extends IssueSearchDTO {

}

export interface CreateIssueDTO {
    issueType: IssueType;
    projectId?: number;
    workId?: number;
    title: string;
    description?: string;
    isPublic?: boolean;
    userIds?: number[];
    collaborationIds?: number[];
}