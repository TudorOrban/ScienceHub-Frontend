"use client";

import { useSearchChatMessagesByChatId } from "../hooks/useSearchChatMessagesByChatId";


export interface ChatClientPageProps {
    chatId: number;
}

export default function ChatClientPage({
    chatId,
}: ChatClientPageProps) {
    const { data, isLoading, error } = useSearchChatMessagesByChatId(chatId, { page: 1, itemsPerPage: 10 }, true);
    console.log(data, isLoading, error);

    return (
        <div>Chat Client Page</div>
    );
};