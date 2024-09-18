"use client";

import { getUserProfileBaseMenuConfiguration, pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useUserProfileDetails } from "@/core/user/hooks/useUserProfileDetails";
import { useMenuHandlers } from "@/shared/common/hooks/useMenuHandlers";
import { usePageSearchControls } from "@/shared/search/hooks/usePageSearchControls";
import ListHeader from "@/shared/common/components/ListHeader";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import NotFoundFallback from "@/shared/error/components/NotFoundFallback";
import { useSearchWorksByUserIdAndWorkType } from "../hooks/useSearchWorksByUserIdAndWorkType";
import { WorkType } from "../models/Work";
import WorksTable from "./WorksTable";


export interface UserWorksPageProps {
    userId?: number;
    currentRoute?: boolean;
}

const UserWorksPage = ({
    userId,
    currentRoute = true
}: UserWorksPageProps) => {
    const pageUIConfiguration = pagesUIConfigurations["works"];

    // Handlers
    const { menuStates, setMenuState } = useMenuHandlers(pageUIConfiguration.menus ?? []);
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
    const { data, error, isLoading } = useSearchWorksByUserIdAndWorkType(
        usedId ?? 0, 
        menuStates?.["Work Type"] as WorkType,
        searchParams ?? {}, 
        !!usedId
    );

    if (!isUserProfilePage && currentRoute) {
        return (
            <NotFoundFallback message="User not found" />
        );
    };

    return (
        <div className="overflow-x-hidden">
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

            <WorksTable
                data={data}
                error={error}
                searchParams={searchParams}
                isLoading={isLoading}
                menuStates={menuStates}
                handlePageChange={handlePageChange}
            />

        </div>
    );
}

export default UserWorksPage;