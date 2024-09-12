import { CollaborationSmall } from "@/features/community/collaborations/models/Collaboration";

export interface UserSmall {
    id: number;
    username: string;
    fullName: string;
    avatarUrl?: string;
}

export interface IdentifierUsersAndCollaborations {
    userIds?: string[];
    collaborationIds?: string[];
    users?: UserSmall[];
    collaborations?: CollaborationSmall[];
}