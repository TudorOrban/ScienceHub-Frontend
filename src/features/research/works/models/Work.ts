import { UserSmall } from "@/core/user/models/User";
import { CollaborationSmall } from "@/features/community/collaborations/models/Collaboration";

export interface WorkSearchDTO {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    workType: WorkType;
    name: string;
    title: string;
    description?: string;
    researchScore?: number;
    totalCitations?: number;
    isPublic?: boolean;
    currentWorkVersionId?: number;
    workMetadata?: WorkMetadata;
    fileLocation?: FileLocation;
    users: UserSmall[];
    collaborations?: CollaborationSmall[];
}

export enum WorkType {
    Paper = "Paper",
    Dataset = "Dataset",
    Experiment = "Experiment",
    DataAnalysis = "DataAnalysis",
    AIModel = "AIModel",
    CodeBlock = "CodeBlock",
}

export interface WorkMetadata {
    license?: string;
    publisher?: string;
    conference?: string;
    researchGrants?: string[];
    tags?: string[];
    keywords?: string[];
}

export interface FileLocation {
    filename: string;
    bucketFilename: string;
    fileType?: string;  // PDF || Dataset || CodeFile || AIModel
    fileSubtype?: string;  // .xlsx, .java etc
}

export interface WorkDetailsDTO extends WorkSearchDTO {
    totalViews?: number;
    totalUpvotes?: number;
    isViewedByCurrentUser?: boolean;
    isUpvotedByCurrentUser?: boolean;
}

export interface CreateWorkDTO {
    workType: WorkType;
    name: string;
    title: string;
    description?: string;
    isPublic?: boolean;
    workMetadata?: WorkMetadata;
    fileLocation?: FileLocation;
    users: UserSmall[];
    collaborations?: CollaborationSmall[];
}