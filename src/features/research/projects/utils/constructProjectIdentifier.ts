import { constructIdentifier } from "@/shared/utils/featureURLConstructor";
import { ProjectSearchDTO } from "../models/Project";

export const constructProjectIdentifier = (project?: ProjectSearchDTO): string => {
    return constructIdentifier(project?.users, project?.collaborations);
};