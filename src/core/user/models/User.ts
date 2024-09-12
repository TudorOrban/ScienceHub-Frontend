import { CollaborationSmall } from "@/features/community/collaborations/models/Collaboration";

export interface UserSmall {
    id: number;
    username: string;
    fullName: string;
    avatarUrl?: string;
}

export interface IdentifierUsersAndCollaborations {
    usernames?: string[];
    collaborationNames?: string[];
    users?: UserSmall[];
    collaborations?: CollaborationSmall[];
}

export interface UserDetails extends UserSmall {
    
}