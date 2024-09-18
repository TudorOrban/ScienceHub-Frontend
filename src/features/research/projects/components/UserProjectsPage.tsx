"use client";

import { getUserProfileBaseMenuConfiguration, pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useUserProfileDetails } from "@/core/user/hooks/useUserProfileDetails";
import { useMenuHandlers } from "@/shared/common/hooks/useMenuHandlers";
import { usePageSearchControls } from "@/shared/search/hooks/usePageSearchControls";
import { useSearchProjectsByUserId } from "../hooks/useSearchProjectsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import ProjectCardList from "./ProjectCardList";
import NotFoundFallback from "@/shared/error/components/NotFoundFallback";


export interface UserProjectsPageProps {
    userId?: number;
    currentRoute?: boolean;
}

const UserProjectsPage = ({
    userId,
    currentRoute = true
}: UserProjectsPageProps) => {
    const pageUIConfiguration = pagesUIConfigurations["projects"];

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
    const { data, error, isLoading } = useSearchProjectsByUserId(
        usedId ?? 0, 
        searchParams ?? {}, 
        !!usedId
    );

    if (!isUserProfilePage && currentRoute) {
        console.log("User not found: ", usedId);
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

export default UserProjectsPage;