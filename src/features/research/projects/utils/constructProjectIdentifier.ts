import { ProjectSearchDTO } from "../models/Project";

export const constructProjectIdentifier = (project?: ProjectSearchDTO): string => {
    if (!project) return "not-found";
    const userIds = (project?.users || []).map((user) => user.username);
    const collaborationIds = (project?.collaborations || []).map((collaboration) => `T~${collaboration.name}`);
    const identifier = [...userIds, ...collaborationIds].join("~");

    return identifier;
};