"use client";

import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import { useGetChatByChatId } from "../hooks/useGetChatByChatId";
import { useSearchChatMessagesByChatId } from "../hooks/useSearchChatMessagesByChatId";
import ChatMediumCard from "./ChatMediumCard";
import { ChatMessages } from "./ChatMessages";


export interface ChatClientPageProps {
    chatId: number;
}

export default function ChatClientPage({
    chatId,
}: ChatClientPageProps) {
    const { currentUser } = useCurrentUser();
    
    const { data: chat, isLoading: isChatLoading, error: chatError } = useGetChatByChatId(chatId, !!chatId);
    const { data: messages, isLoading: areMessagesLoading, error: messagesError } = useSearchChatMessagesByChatId(chatId, { page: 1, itemsPerPage: 10 }, !!chatId);


    return (
        <div className="w-full">
            {chat && (
                <ChatMediumCard
                    chat={chat}
                />
            )}

            <ChatMessages chatMessages={messages?.results ?? []} isLoading={areMessagesLoading} error={messagesError} currentUserId={currentUser?.id}/>
        </div>
    );
};