import { Result } from "@/shared/http/Http";
import { UserDetailsDTO } from "../models/User";

export interface UserDetailsPanelProps {
    result?: Result<UserDetailsDTO>;
}

const UserDetailsPanel = ({ result }: UserDetailsPanelProps) => {
    return (
        <div>
            Details Panel
        </div>
    );
};

export default UserDetailsPanel;