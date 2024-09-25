import { UserSmall } from "@/core/user/models/User";
import { Feature } from "../common/models/Features";
import { CollaborationSmall } from "@/features/community/collaborations/models/Collaboration";


export const constructFeatureURL = (feature: Feature, name?: string, users?: UserSmall[], collaborations?: CollaborationSmall[]): string => {
    if (!name) return "/not-found";
    const identifier = constructIdentifier(users, collaborations);
    if (identifier == "/not-found") return "/not-found";

    switch (feature) {
        case Feature.UserProfile:
            return `/${name}/overview`;
        case Feature.Project:
            return `/${identifier}/research/projects/${name}`;
        case Feature.Work:
            return `/${identifier}/research/works/${name}`;
        case Feature.Issue:
            return `/${identifier}/management/issues/${name}`;
        case Feature.Review:
            return `/${identifier}/management/reviews/${name}`;
        case Feature.Discussion:
            return `/${identifier}/community/discussions/${name}`;
        case Feature.Chat:
            return `/${identifier}/community/chats/${name}`;
        default:
            return "/not-found";
    }
}

export const constructIdentifier = (users?: UserSmall[], collaborations?: CollaborationSmall[]): string => {
    if (!users && !collaborations) return "/not-found";

    const userIds = (users || []).map((user) => user.username);
    const collaborationIds = (collaborations || []).map((collaboration) => `T~${collaboration.name}`);
    const identifier = [...userIds, ...collaborationIds].join("~");

    return identifier;
};

