import { Result } from "@/shared/http/Http";
import { UserDetailsDTO } from "../models/User";

export interface UserMetricsPanelProps {
    result?: Result<UserDetailsDTO>;
}

const UserMetricsPanel = ({
    result
}: UserMetricsPanelProps) => {
    return (
        <div>
            Metrics Panel
        </div>
    );
};

export default UserMetricsPanel;