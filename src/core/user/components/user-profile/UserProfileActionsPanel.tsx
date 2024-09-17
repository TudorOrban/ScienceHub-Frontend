import { Result } from "@/shared/http/Http";
import { UserDetailsDTO } from "../../models/User";
import { faEllipsis, faMessage, faQuoteLeft, faThumbsUp, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import StandardButton from "@/shared/common/components/simple/StandardButton";

export interface UserProfileActionsPanelProps {
    result?: Result<UserDetailsDTO>;
}

export const UserProfileActionsPanel = ({ result }: UserProfileActionsPanelProps) => {
    return (
        <div className="flex items-center justify-end space-x-4">
            <StandardButton
                item={{ icon: faThumbsUp, label: "Recommend", value: "" }}
                mode="icon-only"
                isSelected={result?.data?.isRecommendedByCurrentUser}
            />
            <StandardButton
                item={{ icon: faQuoteLeft, label: "Cite", value: "" }}
                mode="icon-only"
            />
            <StandardButton
                item={{ icon: faUserPlus, label: "Follow", value: "" }}
                mode="icon-only"
                isSelected={result?.data?.isFollowedByCurrentUser}
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