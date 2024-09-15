import { Result, StandardAPIError } from "@/shared/http/Http";
import { UserDetailsDTO } from "../models/User";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import UserAvatar from "./UserAvatar";
import StandardLabelValueText from "@/shared/common/components/simple/StandardLabelValueText";

export interface UserProfileHeaderProps {
    result?: Result<UserDetailsDTO>;
    error?: StandardAPIError;
    isLoading?: boolean;
}

const UserProfileHeader = ({
    result,
}: UserProfileHeaderProps) => {

    if (result?.isLoading) {
        return (
            <LoadingSkeleton isLoading={result?.isLoading} />
        );
    }

    if (result?.error) {
        return (
            <ErrorFallback error={result?.error} />
        );
    }

    return (
        <div className="flex items-center justify-between w-full border-b border-gray-300 shadow-sm page-standard-horizontal-padding py-6">
            <div>
                <div className="flex items-center space-x-4">
                    <UserAvatar userSmall={result?.data} size="large"/>

                    <div className="space-y-4">
                        <h2 className="label-large-xl">{result?.data?.username}</h2>
                        
                        <StandardLabelValueText label="Bio" value={result?.data?.bio} />
                    </div>

                </div>

                <div className="space-y-4">
                    <div>

                    </div>

                </div>
            </div>

            <div>
                <button className="standard-button">Follow</button>
            </div>
        </div>
    );
};

export default UserProfileHeader;