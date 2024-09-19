import { Result, StandardAPIError } from "@/shared/http/Http";
import { WorkDetailsDTO } from "../models/Work";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import { UIItem } from "@/shared/common/models/UITypes";
import { faBookAtlas, faEye, faPaperclip, faShare, faUpLong } from "@fortawesome/free-solid-svg-icons";
import StandardLabelValueText from "@/shared/common/components/simple/StandardLabelValueText";
import MetricsPanel from "@/core/user/components/user-profile/MetricsPanel";
import UsersAndCollaborationsUI from "@/shared/common/components/UsersAndTeamsUI";
import { UserProfileActionsPanel } from "@/core/user/components/user-profile/UserProfileActionsPanel";
import { WorkActionsPanel } from "./WorkActionsPanel";

export interface WorkHeaderProps {
    result?: Result<WorkDetailsDTO>;
    addBottom?: boolean;
}

const WorkHeader = ({
    result,
    addBottom = false,
}: WorkHeaderProps) => {
    const metrics: Record<string, UIItem>[] = [
        {
            "researchScore": { label: "Research Score", value: (result?.data?.researchScore ?? 0).toString(), icon: faBookAtlas },
            "totalCitations": { label: "Total Citations", value: (result?.data?.totalCitations ?? 0).toString(), icon: faPaperclip },
        }, 
        {
            "totalViews": { label: "Total Views", value: (result?.data?.totalViews ?? 0).toString(), icon: faEye },
            "totalUpvotes": { label: "Total Upvotes", value: (result?.data?.totalUpvotes ?? 0).toString(), icon: faUpLong },
        }
    ];

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
                <div className="space-y-4">
                    <h2 className="label-large-xl">{result?.data?.title ?? ""}</h2>
                    
                    <UsersAndCollaborationsUI users={result?.data?.users ?? []} collaborations={result?.data?.collaborations ?? []} />
                </div>
                
                <div className="space-y-3">
                    {/* <StandardLabelValueText label="Location" value={result?.data?.userDetails?.location} />
                    <StandardLabelValueText label="Joined At" value={result?.data?.createdAt} /> */}

                    {/* <div className="flex items-center space-x-2">
                        <StandardLabelValueText label="Followers" value={(result?.data?.totalFollowers ?? 0).toString()} />
                        <span className="text-gray-400">|</span>
                        <StandardLabelValueText label="Following" value={(result?.data?.totalFollowing ?? 0).toString()} />
                    </div> */}
                </div>
            </div>

            <div className="space-y-4">            
                <MetricsPanel metrics={metrics} />

                <WorkActionsPanel result={result} />
            </div>
        </div>
    );
};

export default WorkHeader;
