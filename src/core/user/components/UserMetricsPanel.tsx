import { Result } from "@/shared/http/Http";
import { UserDetailsDTO } from "../models/User";
import StandardLabelValueText from "@/shared/common/components/simple/StandardLabelValueText";

export interface UserMetricsPanelProps {
    result?: Result<UserDetailsDTO>;
}

const UserMetricsPanel = ({
    result
}: UserMetricsPanelProps) => {
    return (
        <div className="flex items-center space-x-8 px-4 py-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
            <div className="space-y-4">
                <StandardLabelValueText label="Research Score" value={(result?.data?.researchScore ?? 0).toString()} size="small"/>
                <StandardLabelValueText label="H-Index" value={(result?.data?.hIndex ?? 0).toString()} size="small" />
                <StandardLabelValueText label="Total Citations" value={(result?.data?.totalCitations ?? 0).toString()} size="small" />
            </div>

            <div className="space-y-4">
                <StandardLabelValueText label="Total Views" value={(result?.data?.totalViews ?? 0).toString()} size="small" />
                <StandardLabelValueText label="Total Upvotes" value={(result?.data?.totalUpvotes ?? 0).toString()} size="small" />
                <StandardLabelValueText label="Total Shares" value={(result?.data?.totalShares ?? 0).toString()} size="small" />

            </div>
        </div>
    );
};

export default UserMetricsPanel;