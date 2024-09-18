import { Result } from "@/shared/http/Http";
import { UserDetailsDTO, UserSmall } from "../../models/User";
import { faEdit, faEllipsis, faMessage, faQuoteLeft, faThumbsUp, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import StandardButton from "@/shared/common/components/simple/StandardButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface UserProfileActionsPanelProps {
    result?: Result<UserDetailsDTO>;
    currentUser?: UserSmall;
}

export const UserProfileActionsPanel = ({ 
    result,
    currentUser
}: UserProfileActionsPanelProps) => {

    return (
        <div className="flex items-center justify-end space-x-4">
            <StandardButton
                item={{ icon: faThumbsUp, label: "Recommend", value: "" }}
                mode="icon-only"
                isSelected={result?.data?.isRecommendedByCurrentUser}
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

            {currentUser?.id === result?.data?.id && (
                <button className="flex items-center space-x-2 standard-write-button">
                    <FontAwesomeIcon icon={faEdit} className="small-icon-white" />
                    <span className="font-medium">Edit Profile</span>
                </button>
            )}
        </div>
    );
};