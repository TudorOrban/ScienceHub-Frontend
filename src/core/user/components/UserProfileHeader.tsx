import { Result, StandardAPIError } from "@/shared/http/Http";
import { UserDetailsDTO } from "../models/User";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import UserAvatar from "./UserAvatar";
import StandardLabelValueText from "@/shared/common/components/simple/StandardLabelValueText";
import UserMetricsPanel from "./UserMetricsPanel";
import { UserProfileActionsPanel } from "./UserProfileActionsPanel";

export interface UserProfileHeaderProps {
    result?: Result<UserDetailsDTO>;
    addBottom?: boolean;
}

const UserProfileHeader = ({
    result,
    addBottom = false
}: UserProfileHeaderProps) => {

    if (result?.isLoading) {
        return (
            <div className="w-96 h-96 bg-red-500">
                
            <LoadingSkeleton isLoading={result?.isLoading} />
            </div>
        );
    }

    if (result?.error) {
        return (
            <ErrorFallback error={result?.error} />
        );
    }

    return (
        <div className={`flex items-center justify-between w-full page-standard-horizontal-padding pt-6 ${addBottom ? "border-b border-gray-300 shadow-sm py-4" : ""}`}>
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <UserAvatar userSmall={result?.data} size="large"/>

                    <div className="space-y-2">
                        <h2 className="label-large-xl">{result?.data?.username ?? ""}</h2>
                        
                        <StandardLabelValueText label="Bio" value={result?.data?.bio} />
                    </div>

                </div>

                <div className="space-y-2">
                    <StandardLabelValueText label="Location" value={result?.data?.userDetails?.location} />
                    <StandardLabelValueText label="Joined At" value={result?.data?.createdAt} />
                </div>
            </div>

            <div>            
                <UserMetricsPanel result={result} />

                <UserProfileActionsPanel result={result} />
            </div>
        </div>
    );
};

export default UserProfileHeader;