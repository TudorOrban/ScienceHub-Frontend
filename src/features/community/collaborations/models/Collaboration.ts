import { UserSmall } from "@/core/user/models/User";

export interface CollaborationSmall {
    id: number;
    name: string;
    users: UserSmall[];
}