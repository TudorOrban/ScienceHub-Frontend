"use client";

import { pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import { useSearchChatsByUserId } from "@/features/community/chats/hooks/useSearchChatsByUserId";
import { usePageSearchControls } from "@/shared/search/hooks/usePageSearchControls";

export default function DiscussionsPage() {
    const pageUIConfiguration = pagesUIConfigurations["chats"];

    const { 
        searchParams, handleTermChange, handleSortOptionChange, handleToggleDescending, handlePageChange
     } = usePageSearchControls(pageUIConfiguration.initialSearchParams ?? {});

    const { currentUser } = useCurrentUser();
    const { data, error, isLoading } = useSearchChatsByUserId(currentUser?.id ?? 0, searchParams ?? {}, !!currentUser?.id);
console.log("data: ", data);

    return (
        <div>
            {data?.results?.map((chat) => (
                <div key={chat.id}>
                    {chat.title}
                </div>
            ))}
            
        </div>
    )
}