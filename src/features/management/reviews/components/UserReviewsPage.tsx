
"use client";

import { getUserProfileBaseMenuConfiguration, pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useUserProfileDetails } from "@/core/user/hooks/useUserProfileDetails";
import ReviewsTable from "@/features/management/reviews/components/ReviewsTable";
import { useSearchReviewsByUserIdAndReviewType } from "@/features/management/reviews/hooks/useSearchReviewsByUserIdAndReviewType";
import { ReviewType } from "@/features/management/reviews/models/Review";
import ListHeader from "@/shared/common/components/ListHeader";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import { useMenuHandlers } from "@/shared/common/hooks/useMenuHandlers";
import NotFoundFallback from "@/shared/error/components/NotFoundFallback";
import { usePageSearchControls } from "@/shared/search/hooks/usePageSearchControls";

export interface UserReviewsPageProps {
    userId?: number;
    currentRoute?: boolean;
}

const UserReviewsPage = ({
    userId,
    currentRoute = true
}: UserReviewsPageProps) => {
    const pageUIConfiguration = pagesUIConfigurations["reviews"];
    const { menuStates, setMenuState } = useMenuHandlers(pageUIConfiguration.menus ?? []);

    // Handlers
    const menuSelectHandlers = (pageUIConfiguration.menus ?? []).reduce((acc, menu) => ({
        ...acc,
        [menu.menuId]: (value: string) => setMenuState(menu.menuId, value)
    }), {});

    const { 
        searchParams, handleTermChange, handleSortOptionChange, handleToggleDescending, handlePageChange
     } = usePageSearchControls(pageUIConfiguration.initialSearchParams ?? {});

     // Data fetching
    let usedId = !currentRoute ? userId : undefined;
    const {
        usersAndCollaborations,
        userDetailsResult,
        isUserProfilePage,
    } = useUserProfileDetails(getUserProfileBaseMenuConfiguration(), false, usedId);

    usedId = usedId ? usedId : usersAndCollaborations?.users?.[0]?.id ?? undefined;
    const { data, error, isLoading } = useSearchReviewsByUserIdAndReviewType(
        usedId ?? 0, 
        menuStates?.["Review Type"] as ReviewType,
        searchParams ?? {}, 
        !!usedId
    );

    if (!isUserProfilePage && currentRoute) {
        return (
            <NotFoundFallback message="User not found" />
        );
    };

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

export default UserReviewsPage;