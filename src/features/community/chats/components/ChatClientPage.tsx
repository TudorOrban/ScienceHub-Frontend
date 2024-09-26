"use client";

import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import { useGetChatByChatId } from "../hooks/useGetChatByChatId";
import { useSearchChatMessagesByChatId } from "../hooks/useSearchChatMessagesByChatId";
import { ChatMessages } from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatPageHeader from "./ChatPageHeader";
import { useEffect, useState } from "react";
import { ChatMessageSearchDTO } from "../models/Chat";
import { SearchParams } from "@/shared/search/models/Search";
import * as signalR from '@microsoft/signalr';

export interface ChatClientPageProps {
    chatId: number;
}

export default function ChatClientPage({
    chatId,
}: ChatClientPageProps) {
    const initialSearchParams: SearchParams = {
        sortBy: "createdAt",
        sortDescending: false,
        page: 1,
        itemsPerPage: 12,
    };

    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

    const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);
    const [messages, setMessages] = useState<ChatMessageSearchDTO[]>([]);

    const { currentUser } = useCurrentUser();
    
    const { data: chat, isLoading: isChatLoading, error: chatError } = useGetChatByChatId(chatId, !!chatId);
    const {
        data: oldMessages, 
        isLoading: areMessagesLoading,
        error: messagesError 
    } = useSearchChatMessagesByChatId(chatId, searchParams, !!chatId);
    
    useEffect(() => {
        if (!oldMessages) {
            return;
        }
        
        const mergedMessages = [
            ...oldMessages.results,
            ...messages,
        ];
        mergedMessages.sort((a, b) => new Date(a.createdAt ?? "").getTime() - new Date(b.createdAt ?? "").getTime());
        setMessages(mergedMessages);
    }, [oldMessages]);

    useEffect(() => {
        const connect = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:8081/chatHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connect.start().then(() => {
            console.log("Connection started");
            setConnection(connect);
        }).catch((error) => {
            console.log("Error: ", error);
        });

        connect.on("ReceiveMessage", (user, message) => {
            console.log("Received message: ", user, message);
        });
    }, []);

    const areMoreMessagesAvailable = (searchParams?.page ?? 0) * (searchParams?.itemsPerPage ?? 0) <= (oldMessages?.totalCount ?? 0);

    const handleLoadMoreMessages = () => {
        if (areMessagesLoading || !areMoreMessagesAvailable) return;
        setSearchParams({
            ...searchParams,
            page: (searchParams?.page ?? 0) + 1,
        });
    }

    const handleSendMessage = (message: string) => {
        console.log("Sending message: ", message);
        if (connection) connection.invoke("SendMessage", "Username", message);
    }


    return (
        <div className="w-full h-full flex flex-col">
            {chat && (
                <div className="flex-none">
                    <ChatPageHeader 
                        chat={chat} 
                        isLoading={isChatLoading}
                        error={chatError}
                        currentUserId={currentUser?.id}
                    />
                </div>
            )}

            <div className="flex-grow overflow-y-auto">
                <ChatMessages
                    chatMessages={messages ?? []}
                    isLoading={areMessagesLoading}
                    error={messagesError}
                    currentUserId={currentUser?.id}
                    areMoreMessagesAvailable={areMoreMessagesAvailable}
                    onLoadMoreMessages={handleLoadMoreMessages}
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