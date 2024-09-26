import { StandardAPIError } from "@/shared/http/Http";
import { ChatMessageSearchDTO } from "../models/Chat";
import ErrorFallback from "@/shared/error/components/ErrorFallback";
import NoResultsFallback from "@/shared/error/components/NoResultsFallback";
import { useRef } from "react";
import { formatMessageDateTime } from "@/shared/utils/uiFormatterUtils";

export interface ChatMessagesProps {
    chatMessages: ChatMessageSearchDTO[];
    isLoading?: boolean;
    error?: StandardAPIError;
    currentUserId?: number;
    areMoreMessagesAvailable?: boolean;
    onLoadMoreMessages?: () => void;
}

export const ChatMessages = ({ 
    chatMessages,
    isLoading,
    error,
    currentUserId,
    areMoreMessagesAvailable,
    onLoadMoreMessages,
}: ChatMessagesProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

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

    const isSameDay = (message: ChatMessageSearchDTO, nextMessageIndex: number) => {
        if (nextMessageIndex >= chatMessages.length) {
            return false;
        }
        return new Date(message.createdAt?.toString() ?? "")?.getDay() === new Date(chatMessages?.[nextMessageIndex]?.createdAt?.toString() ?? "")?.getDay();
    }

    return (
        <div className="w-full h-full flex flex-col-reverse p-4 overflow-y-auto">
            {chatMessages.map((chatMessage, index) => (
                <div key={chatMessage.id} className="w-full p-2">
                    {areMoreMessagesAvailable && index === chatMessages.length - 1 && (
                        <div className="flex items-center justify-center w-full my-2">
                            <button
                                className="w-32 h-8 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
                                onClick={onLoadMoreMessages}
                            >
                                <p className="text-sm">
                                    Load more
                                </p>
                            </button>
                        </div>
                    )}

                    {Number(currentUserId) === Number(chatMessage.userId) ? (
                        <div className="flex items-center justify-end w-full">
                            <div className="flex items-end max-w-2xl space-x-4 px-4 py-2 rounded-lg shadow-sm bg-blue-500 text-white break-words">
                                <p className="text-base">
                                    {chatMessage?.content ?? ""}
                                </p>
                                
                                <p className="text-xs whitespace-nowrap">
                                    {formatMessageDateTime(chatMessage?.createdAt?.toString())}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-start w-full">
                            <div className="flex items-end max-w-2xl space-x-4 px-4 py-2 rounded-lg shadow-sm bg-gray-100 text-gray-800 break-words">
                                <p className="text-base">
                                    {chatMessage?.content ?? ""}
                                </p>

                                <p className="text-xs whitespace-nowrap">
                                    {formatMessageDateTime(chatMessage?.createdAt?.toString())}
                                </p>
                            </div>
                        </div>
                    )}

                    {!isSameDay(chatMessage, index) && (
                        <div className="flex items-center justify-center w-full">
                            <div className="w-40 h-10 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-md shadow-sm">
                                <p className="text-xs text-gray-500">
                                    {formatMessageDateTime(chatMessage.createdAt?.toString())}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            
            <div ref={bottomRef} />
        </div>
    );
};

