import { StandardAPIError } from "@/shared/http/Http";
import { ChatMessageSearchDTO } from "../models/Chat";

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
    console.log(chatMessages);
    console.log("Current User Id: ", currentUserId);
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
        </div>
    );
};

