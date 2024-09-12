import { IdentifierUsersAndCollaborations } from "@/core/user/models/User";


export const parseFeatureURLToIdentifier = (url: string): string => {
    const urlParts = url.split("/").filter((part) => part !== "");

    if (urlParts.length == 0) return "";

    return urlParts[0];
}

export const parseIdentifier = (identifier?: string): IdentifierUsersAndCollaborations => {
    if (!identifier) return { userIds: [], collaborationIds: [] };

    const ids = identifier.split("~");
    const userIds = ids.filter((id) => !id.startsWith("T")).map((username) => username);
    const collaborationIds = ids.filter((id) => id.startsWith("T")).map((name) => name.slice(2));

    return { userIds, collaborationIds };
}