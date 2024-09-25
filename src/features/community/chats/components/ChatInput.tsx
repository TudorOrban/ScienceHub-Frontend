"use client";

import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export interface ChatInputProps {
    handleSendMessage?: (message: string) => void;
}

const ChatInput = ({
    handleSendMessage,
}: ChatInputProps) => {
    const [localInputMessage, setLocalInputMessage] = useState<string>("");

    const onSendMessage = (message: string) => {
        handleSendMessage?.(message);
    }

    return (
        <div className="w-full flex items-center border-y border-gray-300 h-12">
            <input
                type="text"
                value={localInputMessage}
                onChange={(e) => setLocalInputMessage(e.target.value)}
                placeholder="Search ScienceHub"
                className="w-full outline-none px-4"
            />

            <button
                className="w-12 h-12 flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faPaperclip} className="small-icon" />
            </button>

            <button
                className="w-12 h-12 flex items-center justify-center bg-gray-50 border border-gray-300 hover:bg-gray-100"
                onClick={() => onSendMessage(localInputMessage)}
            >
                <FontAwesomeIcon icon={faPaperPlane} className="small-icon" />
            </button>
        </div>
    );
}

export default ChatInput;