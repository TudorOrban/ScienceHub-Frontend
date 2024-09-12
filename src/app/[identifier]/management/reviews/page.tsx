"use client";

import { pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import ReviewsTable from "@/features/management/reviews/components/ReviewsTable";
import { useSearchReviewsByUserIdAndReviewType } from "@/features/management/reviews/hooks/useSearchReviewsByUserIdAndReviewType";
import { ReviewType } from "@/features/management/reviews/models/Review";
import ListHeader from "@/shared/common/components/ListHeader";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import { useMenuHandlers } from "@/shared/common/hooks/useMenuHandlers";
import { usePageSearchControls } from "@/shared/search/hooks/usePageSearchControls";


export default function ReviewsPage() {
    const pageUIConfiguration = pagesUIConfigurations["reviews"];
    const { menuStates, setMenuState } = useMenuHandlers(pageUIConfiguration.menus ?? []);

    const menuSelectHandlers = (pageUIConfiguration.menus ?? []).reduce((acc, menu) => ({
        ...acc,
        [menu.menuId]: (value: string) => setMenuState(menu.menuId, value)
    }), {});

    const { 
        searchParams, handleTermChange, handleSortOptionChange, handleToggleDescending, handlePageChange
     } = usePageSearchControls(pageUIConfiguration.initialSearchParams ?? {});

    const { currentUser } = useCurrentUser();
    const { data, error, isLoading } = useSearchReviewsByUserIdAndReviewType(currentUser?.id ?? 0, menuStates?.["Review Type"] as ReviewType, searchParams ?? {}, !!currentUser?.id);

    return (
        <div className="text-2xl overflow-x-hidden">
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

            <div className="page-standard-horizontal-padding pt-4">
                <NavigationMenus 
                    menus={pageUIConfiguration.menus ?? []} 
                    menuSelectHandlers={menuSelectHandlers}
                />
            </div>

            <ReviewsTable
                data={data}
                error={error}
                isLoading={isLoading}
                searchParams={searchParams}
                menuStates={menuStates}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}