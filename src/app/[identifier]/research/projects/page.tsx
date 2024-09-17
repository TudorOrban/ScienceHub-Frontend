"use client";

import { getUserProfileBaseMenuConfiguration, pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useCurrentRouteIdentifierContext } from "@/core/user/contexts/CurrentRouteIdentifierContext";
import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import { useUserProfileDetails } from "@/core/user/hooks/useUserProfileDetails";
import ProjectCardList from "@/features/research/projects/components/ProjectCardList";
import { useSearchProjectsByUserId } from "@/features/research/projects/hooks/useSearchProjectsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import { useMenuHandlers } from "@/shared/common/hooks/useMenuHandlers";
import { usePageSearchControls } from "@/shared/search/hooks/usePageSearchControls";
import { useState } from "react";

export default function UserProjectsPage() {
    const pageUIConfiguration = pagesUIConfigurations["projects"];
    const { menuStates, setMenuState } = useMenuHandlers(pageUIConfiguration.menus ?? []);

    const {
        userDetailsResult,
        isUserProfilePage
    } = useUserProfileDetails(getUserProfileBaseMenuConfiguration(), false);

    const menuSelectHandlers = (pageUIConfiguration.menus ?? []).reduce((acc, menu) => ({
        ...acc,
        [menu.menuId]: (value: string) => setMenuState(menu.menuId, value)
    }), {});

    const { 
        searchParams, handleTermChange, handleSortOptionChange, handleToggleDescending, handlePageChange
    } = usePageSearchControls(pageUIConfiguration.initialSearchParams ?? {});

    const { data, error, isLoading } = useSearchProjectsByUserId(userDetailsResult?.data?.id ?? 0, searchParams ?? {}, !!userDetailsResult?.data?.id);

    if (!isUserProfilePage) {
        return (
            <div>
                Not Found.
            </div>
        );
    }

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

            <ProjectCardList
                data={data}
                error={error}
                searchParams={searchParams}
                isLoading={isLoading}
                menuStates={menuStates}
                handlePageChange={handlePageChange}
                disableViewMode={false}
            />

        </div>
    );
}