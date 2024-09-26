import { CollaborationSmall } from "@/features/community/collaborations/models/Collaboration";

export interface UserSmall {
    id: number;
    username: string;
    fullName: string;
    createdAt?: string;
    avatarUrl?: string;
    isOnline?: boolean;
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

    researchScore?: number;
    hIndex?: number;
    totalCitations?: number;
    totalViews?: number;
    totalUpvotes?: number;
    totalShares?: number;
    totalFollowers?: number;
    totalFollowing?: number;

    isFollowingCurrentUser?: boolean;
    isFollowedByCurrentUser?: boolean;
    isRecommendedByCurrentUser?: boolean;
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