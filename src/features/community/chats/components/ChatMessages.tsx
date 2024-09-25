import { StandardAPIError } from "@/shared/http/Http";
import { ChatMessageSearchDTO } from "../models/Chat";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import NoResultsFallback from "@/shared/error/components/NoResultsFallback";
import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import { useEffect, useRef } from "react";

export interface ChatMessagesProps {
    chatMessages: ChatMessageSearchDTO[];
    isLoading?: boolean;
    error?: StandardAPIError;
    currentUserId?: number;
}

export const ChatMessages = ({ 
    chatMessages,
    isLoading,
    error,
    currentUserId,
}: ChatMessagesProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (bottomRef.current) {
    //         bottomRef.current.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, [chatMessages]);

    if (!!error) {
        return (
            <ErrorFallback error={error} />
        );
    }

    if (chatMessages?.length === 0) {
        return (
            <NoResultsFallback />
        );
    }

    if (isLoading) {
        return (
            <div className="w-full overflow-x-hidden p-4 space-y-4">
                {isLoading && [...Array(6).keys()].map((key) => (
                    <LoadingSkeleton key={key} isLoading={isLoading} className="h-16"/>
                ))}
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col-reverse p-4 overflow-y-auto">
            {chatMessages.map((chatMessage) => (
                <div key={chatMessage.id} className="w-full p-2">
                    {Number(currentUserId) === Number(chatMessage.userId) ? (
                        <div className="flex items-center justify-end w-full">
                            <div className="bg-blue-600 text-white p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-start w-full">
                            <div className="bg-gray-200 text-black p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {chatMessages.map((chatMessage) => (
                <div key={chatMessage.id} className="w-full p-2">
                    {Number(currentUserId) === Number(chatMessage.userId) ? (
                        <div className="flex items-center justify-end w-full">
                            <div className="bg-blue-600 text-white p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-start w-full">
                            <div className="bg-gray-200 text-black p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {chatMessages.map((chatMessage) => (
                <div key={chatMessage.id} className="w-full p-2">
                    {Number(currentUserId) === Number(chatMessage.userId) ? (
                        <div className="flex items-center justify-end w-full">
                            <div className="bg-blue-600 text-white p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-start w-full">
                            <div className="bg-gray-200 text-black p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {chatMessages.map((chatMessage) => (
                <div key={chatMessage.id} className="w-full p-2">
                    {Number(currentUserId) === Number(chatMessage.userId) ? (
                        <div className="flex items-center justify-end w-full">
                            <div className="bg-blue-600 text-white p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-start w-full">
                            <div className="bg-gray-200 text-black p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {chatMessages.map((chatMessage) => (
                <div key={chatMessage.id} className="w-full p-2">
                    {Number(currentUserId) === Number(chatMessage.userId) ? (
                        <div className="flex items-center justify-end w-full">
                            <div className="bg-blue-600 text-white p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-start w-full">
                            <div className="bg-gray-200 text-black p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {chatMessages.map((chatMessage) => (
                <div key={chatMessage.id} className="w-full p-2">
                    {Number(currentUserId) === Number(chatMessage.userId) ? (
                        <div className="flex items-center justify-end w-full">
                            <div className="bg-blue-600 text-white p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-start w-full">
                            <div className="bg-gray-200 text-black p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {chatMessages.map((chatMessage) => (
                <div key={chatMessage.id} className="w-full p-2">
                    {Number(currentUserId) === Number(chatMessage.userId) ? (
                        <div className="flex items-center justify-end w-full">
                            <div className="bg-blue-600 text-white p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-start w-full">
                            <div className="bg-gray-200 text-black p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {chatMessages.map((chatMessage) => (
                <div key={chatMessage.id} className="w-full p-2">
                    {Number(currentUserId) === Number(chatMessage.userId) ? (
                        <div className="flex items-center justify-end w-full">
                            <div className="bg-blue-600 text-white p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-start w-full">
                            <div className="bg-gray-200 text-black p-2 rounded-md shadow-sm break-words">
                                {chatMessage?.content ?? ""}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            
            <div ref={bottomRef} />
        </div>
    );
};

