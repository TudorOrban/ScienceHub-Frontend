import { UserSmall } from "@/core/user/models/User";

export interface Discussion {
    id: number;
    userId: number;
    user?: UserSmall;
    createdAt?: Date;
    updatedAt?: Date;
    title: string;
    content?: string;
    totalUpvotes?: number;
    totalShares?: number;
    totalViews?: number;
    isPublic?: boolean;
    discussionComments?: Comment[];
}

export interface DiscussionSearchDTO {
    id: number;
    userId: number;
    user?: UserSmall;
    createdAt?: Date;
    updatedAt?: Date;
    title: string;
    content?: string;
    totalUpvotes?: number;
    totalShares?: number;
    totalViews?: number;
    totalComments?: number;
    isPublic?: boolean;
}