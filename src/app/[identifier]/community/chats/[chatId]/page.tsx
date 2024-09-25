import ChatClientPage from "@/features/community/chats/components/ChatClientPage";


export default function ChatPage({
    params: { identifier, chatId },
}: {
    params: { identifier: string; chatId: string };
}) {
    const parsedChatId = parseInt(chatId);

    if (isNaN(parsedChatId)) {
        return <div>Invalid chat ID</div>;
    }

    return (
        <ChatClientPage chatId={parsedChatId} />
    )
}