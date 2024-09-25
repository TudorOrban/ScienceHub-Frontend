"use client"

import { ChatSearchDTO } from "../models/Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faInfoCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { constructFeatureURL } from "@/shared/utils/featureURLConstructor";
import { Feature } from "@/shared/common/models/Features";
import Link from "next/link";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/shadcn-ui/components/ui/popover";
import UserAvatar from "@/core/user/components/UserAvatar";

export interface ChatMediumCardProps {
    chat: ChatSearchDTO;
}

const ChatMediumCard = ({
    chat,
}: ChatMediumCardProps) => {

    const chatUrl = constructFeatureURL(Feature.Chat, chat.title?.toString() ?? "");
    const isUniqueUser = (chat?.chatUsers?.length ?? 0) === 1;

    const handleAvatarClick = () => {
        console.log("Avatar clicked");
    }

    return (
        <div className="w-full relative space-y-4 border-y border-gray-300 rounded-md shadow-md text-base">
            <div className="flex items-start justify-between px-4">
                <div className="flex items-center space-x-4">
                    {isUniqueUser && (
                        <UserAvatar userSmall={chat?.chatUsers?.[0]?.user} onClick={() => handleAvatarClick()}/>   
                    )}

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
        </div>
    );
};

export default ChatMediumCard;