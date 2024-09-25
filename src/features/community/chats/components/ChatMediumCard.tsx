"use client"

import { ChatSearchDTO } from "../models/Chat";
import { useRouter } from "next/navigation";
import { constructFeatureURL } from "@/shared/utils/featureURLConstructor";
import { Feature } from "@/shared/common/models/Features";
import Link from "next/link";
import UserAvatar from "@/core/user/components/UserAvatar";
import { formatDate, truncateString } from "@/shared/utils/uiFormatterUtils";

export interface ChatMediumCardProps {
    chat: ChatSearchDTO;
}

const ChatMediumCard = ({
    chat,
}: ChatMediumCardProps) => {
    const router = useRouter();
    console.log("chatid: ", chat.id);
    const chatUrl = constructFeatureURL(Feature.Chat, chat.id.toString() ?? "");
    const userUrl = constructFeatureURL(Feature.UserProfile, chat.chatUsers?.[0]?.user?.username ?? "");
    const isUniqueUser = (chat?.chatUsers?.length ?? 0) === 1;

    return (
        <div className="flex items-start justify-between w-full relative p-4 border-y border-gray-300 text-base">
            <div className="flex items-center space-x-4">
                {isUniqueUser && (
                    <UserAvatar userSmall={chat?.chatUsers?.[0]?.user} onClick={() => router.push(userUrl)}/>   
                )}

                <div>   
                    <Link href={chatUrl}>
                        {isUniqueUser ? (
                                <span className="label-large pseudo-link">{chat.chatUsers?.[0]?.user?.username ?? ""}</span>
                        ) : (
                                <span className="label-large pseudo-link">{chat?.title ?? ""}</span>
                        )}
                    </Link>
                    
                    <p className="text-lg">{truncateString(chat.content, 80)}</p>
                </div>
            </div>

            <div>
                {chat?.updatedAt && (
                    <span className="text-sm text-gray-500">{formatDate(chat.updatedAt.toString())}</span>
                )}
            </div>
        </div>
    );
};

export default ChatMediumCard;