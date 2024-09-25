"use client";

import { pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import ChatCardList from "@/features/community/chats/components/ChatCardList";
import { useSearchChatsByUserId } from "@/features/community/chats/hooks/useSearchChatsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import { usePageSearchControls } from "@/shared/search/hooks/usePageSearchControls";

export default function DiscussionsPage() {
    const pageUIConfiguration = pagesUIConfigurations["chats"];

    const { 
        searchParams, handleTermChange, handleSortOptionChange, handleToggleDescending, handlePageChange
     } = usePageSearchControls(pageUIConfiguration.initialSearchParams ?? {});

    const { currentUser } = useCurrentUser();
    const { data, error, isLoading } = useSearchChatsByUserId(currentUser?.id ?? 0, searchParams ?? {}, !!currentUser?.id);

    return (
        <div className="text-2xl overflow-x-hidden">
            <ListHeader
                pageTitle={pageUIConfiguration.pageTitle}
                sortOptions={pageUIConfiguration.sortOptions}
                createNewButtonData={pageUIConfiguration.createNewButtonData}
                addBottom={true}
                searchParams={searchParams}
                onTermChange={handleTermChange}
                onSortOptionChange={handleSortOptionChange}
                onToggleDescending={handleToggleDescending}
            />

            <ChatCardList
                data={data}
                error={error}
                isLoading={isLoading}
                searchParams={searchParams}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}