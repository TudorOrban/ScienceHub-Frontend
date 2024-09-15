import { Result } from "@/shared/http/Http";
import { UserDetailsDTO } from "../models/User";

export interface UserProfileActionsPanelProps {
    result?: Result<UserDetailsDTO>;
}

export const UserProfileActionsPanel = ({ result }: UserProfileActionsPanelProps) => {
    return (
        <div>
            Actions Panel
        </div>
    );
};