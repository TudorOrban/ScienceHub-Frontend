import { Result, StandardAPIError } from "@/shared/http/Http";
import { UserDetailsDTO } from "../../models/User";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import UserAvatar from "../UserAvatar";
import StandardLabelValueText from "@/shared/common/components/simple/StandardLabelValueText";
import UserMetricsPanel from "./MetricsPanel";
import { UserProfileActionsPanel } from "./UserProfileActionsPanel";
import { UIItem } from "@/shared/common/models/UITypes";
import { faBookAtlas, faEye, faPaperclip, faShare, faTableList, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

export interface UserProfileHeaderProps {
    result?: Result<UserDetailsDTO>;
    addBottom?: boolean;
}

const UserProfileHeader = ({
    result,
    addBottom = false
}: UserProfileHeaderProps) => {
    const metrics: Record<string, UIItem>[] = [
        {
            "researchScore": { label: "Research Score", value: (result?.data?.researchScore ?? 0).toString(), icon: faBookAtlas },
            "hIndex": { label: "H-Index", value: (result?.data?.hIndex ?? 0).toString(), icon: faTableList },
            "totalCitations": { label: "Total Citations", value: (result?.data?.totalCitations ?? 0).toString(), icon: faPaperclip },
        }, 
        {
            "totalViews": { label: "Total Views", value: (result?.data?.totalViews ?? 0).toString(), icon: faEye },
            "totalUpvotes": { label: "Total Upvotes", value: (result?.data?.totalUpvotes ?? 0).toString(), icon: faUpLong },
            "totalShares": { label: "Total Shares", value: (result?.data?.totalShares ?? 0).toString(), icon: faShare },
        }
    ];
    
    const {
        currentUser
    } = useCurrentUser();

    if (result?.isLoading) {
        return (
            <div className="w-full h-96 p-12">
                <LoadingSkeleton isLoading={result?.isLoading} className="w-full"/>
            </div>
        );
    }

    if (result?.error) {
        return (
            <ErrorFallback error={result?.error} />
        );
    }

    return (
        <div className={`flex items-center justify-between w-full page-standard-horizontal-padding page-header-bg pt-6 ${addBottom ? "border-b border-gray-300 shadow-sm py-4" : ""}`}>
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <UserAvatar userSmall={result?.data} size="large"/>

                    <div className="space-y-2">
                        <h2 className="label-large-xl">{result?.data?.username ?? ""}</h2>
                        
                        <StandardLabelValueText label="Bio" value={result?.data?.bio} />
                    </div>

                </div>

                <div className="space-y-3">
                    <StandardLabelValueText label="Location" value={result?.data?.userDetails?.location} />
                    <StandardLabelValueText label="Joined At" value={result?.data?.createdAt} />

                    <div className="flex items-center space-x-2">
                        <StandardLabelValueText label="Followers" value={(result?.data?.totalFollowers ?? 0).toString()} />
                        <span className="text-gray-400">|</span>
                        <StandardLabelValueText label="Following" value={(result?.data?.totalFollowing ?? 0).toString()} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">            
                <UserMetricsPanel metrics={metrics} />

                <UserProfileActionsPanel result={result} currentUser={currentUser ?? undefined} />
            </div>
        </div>
    );
};

export default UserProfileHeader;