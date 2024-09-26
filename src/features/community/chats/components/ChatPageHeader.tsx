"use client";


import { ChatSearchDTO } from "../models/Chat";
import { useRouter } from "next/navigation";
import { constructFeatureURL } from "@/shared/utils/featureURLConstructor";
import { Feature } from "@/shared/common/models/Features";
import Link from "next/link";
import UserAvatar from "@/core/user/components/UserAvatar";
import StandardButton from "@/shared/common/components/simple/StandardButton";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { StandardAPIError } from "@/shared/http/Http";

export interface ChatPageHeaderProps {
    chat: ChatSearchDTO;
    isLoading?: boolean;
    error?: StandardAPIError;
    currentUserId?: number;
}

const ChatPageHeader = ({
    chat,
    isLoading,
    error,
    currentUserId
}: ChatPageHeaderProps) => {
    const router = useRouter();
    
    const users = chat?.chatUsers?.map((chatUser) => chatUser.user)?.filter((user) => !!user) ?? [];
    const isUniqueOtherUser = users?.filter(user => Number(user?.id) === currentUserId)?.length === 1 &&
        users?.filter(user => Number(user?.id) !== currentUserId)?.length === 1;
    const otherUser = users?.filter(user => Number(user?.id) !== currentUserId)?.[0];

    const chatUrl = constructFeatureURL(Feature.Chat, chat.id.toString() ?? "", users);
    const userUrl = constructFeatureURL(Feature.UserProfile, otherUser?.username ?? "");

    return (
        <div className="flex items-center justify-between w-full relative p-4 bg-gray-50 border-y border-gray-300 text-base">
            <div className="flex items-center space-x-4">
                {isUniqueOtherUser && (
                    <UserAvatar userSmall={otherUser} onClick={() => router.push(userUrl)}/>   
                )}

                <div className="space-y-1">   
                    <Link href={chatUrl}>
                        {isUniqueOtherUser ? (
                                <span className="label-large pseudo-link">{otherUser?.username ?? ""}</span>
                        ) : (
                                <span className="label-large pseudo-link">{chat?.title ?? ""}</span>
                        )}
                    </Link>
                    
                    {isUniqueOtherUser && (
                        <>
                            {!otherUser?.isOnline ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-700 border border-gray-300 rounded-full">
                                    </div>
                                    <span className="text-sm text-green-700">Online</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-gray-300 border border-gray-300 rounded-full">
                                    </div>
                                    <span className="text-sm text-gray-500">Offline</span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <div>
                <StandardButton
                    item={{ icon: faEllipsis, label: "More Actions", value: "" }}
                    mode="icon-only"
                />
            </div>
        </div>
    );
}

export default ChatPageHeader;