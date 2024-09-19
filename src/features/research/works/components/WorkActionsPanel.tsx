import { Result } from "@/shared/http/Http";
import { faEllipsis, faMessage, faUpLong, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import StandardButton from "@/shared/common/components/simple/StandardButton";
import { WorkDetailsDTO } from "../models/Work";

export interface WorkActionsPanelProps {
    result?: Result<WorkDetailsDTO>;
}

export const WorkActionsPanel = ({ 
    result,
}: WorkActionsPanelProps) => {

    return (
        <div className="flex items-center justify-end space-x-4">
            <StandardButton
                item={{ icon: faUpLong, label: "Upvote", value: "" }}
                mode="icon-only"
                isSelected={result?.data?.isUpvotedByCurrentUser}
            />
            <StandardButton
                item={{ icon: faUserPlus, label: "Follow", value: "" }}
                mode="icon-only"
                isSelected={false}
            />
            <StandardButton
                item={{ icon: faMessage, label: "Message", value: "" }}
                mode="icon-only"
            />
            <StandardButton
                item={{ icon: faEllipsis, label: "More Actions", value: "" }}
                mode="icon-only"
            />
        </div>
    );
};