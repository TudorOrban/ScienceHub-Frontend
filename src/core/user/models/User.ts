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

export interface UserDetailsDTO extends UserSmall {
    bio?: string;
    userDetails?: UserDetails;
}

export interface UserDetails {
    qualifications?: string[];
    affiliations?: string[];
    researchInterests?: string[];
    fieldsOfResearch?: string[];
    education?: string[];
    contactInformation?: string[];
    socialMediaLinks?: string[];
    location?: string;
    status?: string;
}