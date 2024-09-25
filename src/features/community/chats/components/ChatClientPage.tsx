"use client";

import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import { useGetChatByChatId } from "../hooks/useGetChatByChatId";
import { useSearchChatMessagesByChatId } from "../hooks/useSearchChatMessagesByChatId";
import ChatMediumCard from "./ChatMediumCard";
import { ChatMessages } from "./ChatMessages";
import ChatInput from "./ChatInput";


export interface ChatClientPageProps {
    chatId: number;
}

export default function ChatClientPage({
    chatId,
}: ChatClientPageProps) {
    const { currentUser } = useCurrentUser();
    
    const { data: chat, isLoading: isChatLoading, error: chatError } = useGetChatByChatId(chatId, !!chatId);
    const { data: messages, isLoading: areMessagesLoading, error: messagesError } = useSearchChatMessagesByChatId(chatId, { page: 1, itemsPerPage: 10 }, !!chatId);

    const handleSendMessage = (message: string) => {
        console.log("Sending message: ", message);
    }

    return (
        <div className="w-full h-full flex flex-col">
            {chat && (
                <div className="flex-none">
                    <ChatMediumCard chat={chat} />
                </div>
            )}

            <div className="flex-grow overflow-y-auto">
                <ChatMessages
                    chatMessages={messages?.results ?? []}
                    isLoading={areMessagesLoading}
                    error={messagesError}
                    currentUserId={currentUser?.id}
                />
            </div>

            <div className="flex-none">
                <ChatInput
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};