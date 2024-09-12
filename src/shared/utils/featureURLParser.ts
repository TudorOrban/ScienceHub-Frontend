import { IdentifierUsersAndCollaborations } from "@/core/user/models/User";


export const parseFeatureURLToIdentifier = (url: string): string => {
    const urlParts = url.split("/").filter((part) => part !== "");

    if (urlParts.length == 0) return "";

    return urlParts[0];
}

export const parseIdentifier = (identifier?: string): IdentifierUsersAndCollaborations => {
    if (!identifier) return { usernames: [], collaborationNames: [] };

    const parts = identifier.split("~");
    const collaborationMarkerIndex = parts.indexOf("T");
    const usernames = collaborationMarkerIndex !== -1 ? parts.slice(0, collaborationMarkerIndex) : parts;
    const collaborationNames = collaborationMarkerIndex !== -1 ? parts.slice(collaborationMarkerIndex + 1) : [];

    return { usernames, collaborationNames };
}