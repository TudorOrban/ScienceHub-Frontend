"use client"

import UserAvatar from "@/core/user/components/UserAvatar";
import { ChatSearchDTO } from "../models/Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEllipsis, faEye, faInfoCircle, faPaperPlane, faQuestion, faShare, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { constructFeatureURL } from "@/shared/utils/featureURLConstructor";
import { Feature } from "@/shared/common/models/Features";
import Link from "next/link";
import { UIItem } from "@/shared/common/models/UITypes";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/shadcn-ui/components/ui/popover";

export interface ChatMediumCardProps {
    chat: ChatSearchDTO;
}

const ChatMediumCard = ({
    chat,
}: ChatMediumCardProps) => {
    const router = useRouter();

    const chatUrl = constructFeatureURL(Feature.Chat, chat.title?.toString() ?? "");

    const handleAvatarClick = () => {
        const userProfileUrl = constructFeatureURL(Feature.UserProfile, "");
        router.push(userProfileUrl);
    }

    const handleUpvoteClick = () => {
        console.log("Upvote clicked");
    }

    const handleShareClick = () => {
        console.log("Share clicked");
    }

    const handleViewClick = () => {
        console.log("View clicked");
    }

    const handleCommentClick = () => {
        console.log("Comment clicked");
    }

    const items: UIItem[] = [
        // { icon: faUpLong, label: "", value: (chat?.totalUpvotes ?? 0).toString(), onClick: handleUpvoteClick },
        // { icon: faShare, label: "", value: (chat?.totalShares ?? 0).toString(), onClick: handleShareClick },
        // { icon: faEye, label: "", value: (chat?.totalViews ?? 0).toString(), onClick: handleViewClick },
        // { icon: faComment, label: "", value: (chat?.totalComments ?? 0).toString(), onClick: handleCommentClick },
    ];

    return (
        <div className="w-full relative space-y-4 pt-4 border border-gray-300 rounded-md shadow-md text-base">
            <div className="flex items-start justify-between px-4">
                <div className="flex items-center space-x-4">
                    {/* <UserAvatar userSmall={} onClick={() => handleAvatarClick()}/> */}

                    <Link href={chatUrl}>
                        <span className="label-large pseudo-link">{chat.title}</span>
                    </Link>
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <button className="standard-button">
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="mr-12 w-40 bg-white border border-gray-300 rounded-md shadow-md">
                        <div className="flex flex-col items-start space-y-4">
                            <button className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faPaperPlane} className="small-icon"/>
                                <span className="text-base font-semibold">Report</span>
                            </button>
                            <button className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faInfoCircle} className="small-icon"/>
                                <span className="text-base font-semibold">Info</span>
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="px-4">
                <p className="text-lg">{chat.content}</p>
            </div>

            <div className="flex divide-x divide-gray-200 border-t border-gray-300">
                {items.map((item, index) => (
                    <button 
                        key={index} 
                        onClick={item?.onClick ?? (() => {})}
                        className="flex-1 flex items-center justify-center py-4 space-x-2"
                    >
                        <FontAwesomeIcon icon={item.icon ?? faQuestion} className="small-icon" />
                        <span className="text-lg text-gray-800 font-medium">{item.value ?? 0}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatMediumCard;