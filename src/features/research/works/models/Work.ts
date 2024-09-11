import { UserSmall } from "@/core/user/models/User";

export interface WorkSearchDTO {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    workType: WorkType;
    name: string;
    title: string;
    description?: string;
    researchScore?: number;
    citationsCount?: number;
    isPublic?: boolean;
    currentWorkVersionId?: number;
    workMetadata?: WorkMetadata;
    fileLocation?: FileLocation;
    users: UserSmall[];
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
