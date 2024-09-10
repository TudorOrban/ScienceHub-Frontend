"use client";

import { pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import ProjectCardList from "@/features/research/projects/components/ProjectCardList";
import { useSearchProjectsByUserId } from "@/features/research/projects/hooks/useSearchProjectsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import { useMenuHandlers } from "@/shared/common/hooks/useMenuHandlers";
import { usePageSearchControls } from "@/shared/search/hooks/usePageSearchControls";


export default function ProjectsPage() {
    const pageUIConfiguration = pagesUIConfigurations["projects"];
    const { menuStates, setMenuState } = useMenuHandlers(pageUIConfiguration.menus ?? []);

    const menuSelectHandlers = (pageUIConfiguration.menus ?? []).reduce((acc, menu) => ({
        ...acc,
        [menu.menuId]: (value: string) => setMenuState(menu.menuId, value)
    }), {});

    const { currentUser } = useCurrentUser();
    const { data, error, isLoading } = useSearchProjectsByUserId(currentUser?.id ?? 0, pageUIConfiguration.initialSearchParams ?? {}, !!currentUser?.id);

    const { 
        searchParams, handleTermChange, handleSortOptionChange, handleToggleDescending, handlePageChange
     } = usePageSearchControls(pageUIConfiguration.initialSearchParams ?? {});

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

            <ProjectCardList
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