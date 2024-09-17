import { Result } from "@/shared/http/Http";
import { UserDetailsDTO } from "../../models/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export interface UserProfileActionsPanelProps {
    result?: Result<UserDetailsDTO>;
}

export const UserProfileActionsPanel = ({ result }: UserProfileActionsPanelProps) => {
    return (
        <div className="flex items-center space-x-4">
            <button 
                className="standard-button"
            >
                <FontAwesomeIcon icon={faQuoteLeft} className="small-icon text-gray-800" />
            </button>
        </div>
    );
};