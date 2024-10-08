"use client";

import { pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import DiscussionCardList from "@/features/community/discussions/components/DiscussionCardList";
import { useSearchDiscussionsByUserId } from "@/features/community/discussions/hooks/useSearchDiscussionsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import { usePageSearchControls } from "@/shared/search/hooks/usePageSearchControls";


export default function DiscussionsPage() {
    const pageUIConfiguration = pagesUIConfigurations["discussions"];

    const { 
        searchParams, handleTermChange, handleSortOptionChange, handleToggleDescending, handlePageChange
     } = usePageSearchControls(pageUIConfiguration.initialSearchParams ?? {});

    const { currentUser } = useCurrentUser();
    const { data, error, isLoading } = useSearchDiscussionsByUserId(currentUser?.id ?? 0, searchParams ?? {}, !!currentUser?.id);

    return (
        <div className="text-2xl overflow-x-hidden space-y-4">
            <ListHeader 
                pageTitle={pageUIConfiguration.pageTitle}
                sortOptions={pageUIConfiguration.sortOptions}
                createNewButtonData={pageUIConfiguration.createNewButtonData}
                addBottom={false}
                searchParams={searchParams}
                onTermChange={handleTermChange}
                onSortOptionChange={handleSortOptionChange}
                onToggleDescending={handleToggleDescending}
            />

            <DiscussionCardList
                data={data}
                error={error}
                isLoading={isLoading}
                searchParams={searchParams}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}