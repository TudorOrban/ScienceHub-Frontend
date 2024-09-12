import UserAvatar from "@/core/user/components/UserAvatar";
import { DiscussionSearchDTO } from "../models/Discussion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEye, faShare, faUpLong } from "@fortawesome/free-solid-svg-icons";

export interface DiscussionMediumCardProps {
    discussion: DiscussionSearchDTO;
}

const DiscussionMediumCard = ({
    discussion,
}: DiscussionMediumCardProps) => {

    return (
        <div className="w-full space-y-4 pt-4 border border-gray-300 rounded-md shadow-md text-base">
            <div className="flex items-center space-x-2 px-4">
                <UserAvatar userSmall={discussion.user}/>

                <span className="label-large">{discussion.title}</span>
            </div>

            <div className="px-4">
                <p className="text-lg">{discussion.content}</p>
            </div>

            <div className="flex items-center justify-between w-full px-20 py-4 border-t border-gray-300 text-gray-700">
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faUpLong} className="small-icon" />
                    <span className="text-xl font-medium">{discussion.totalUpvotes ?? 0}</span>
                </div>

                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faShare} className="small-icon" />
                    <span className="text-xl font-medium">{discussion.totalShares ?? 0}</span>
                </div>

                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faEye} className="small-icon" />
                    <span className="text-xl font-medium">{discussion.totalViews ?? 0}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faComment} className="small-icon" />
                    <span className="text-xl font-medium">{discussion.totalComments ?? 0}</span>
                </div>
            </div>
        </div>
    );
};

export default DiscussionMediumCard;