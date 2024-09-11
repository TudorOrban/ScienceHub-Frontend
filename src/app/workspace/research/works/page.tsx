"use client";

import { pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import { useSearchWorksByUserIdAndWorkType } from "@/features/research/works/hooks/useSearchWorksByUserIdAndWorkType";
import { WorkType } from "@/features/research/works/models/Work";
import ListHeader from "@/shared/common/components/ListHeader";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import { useMenuHandlers } from "@/shared/common/hooks/useMenuHandlers";
import { usePageSearchControls } from "@/shared/search/hooks/usePageSearchControls";


export default function WorksPage() {
    const pageUIConfiguration = pagesUIConfigurations["works"];
    const { menuStates, setMenuState } = useMenuHandlers(pageUIConfiguration.menus ?? []);

    const menuSelectHandlers = (pageUIConfiguration.menus ?? []).reduce((acc, menu) => ({
        ...acc,
        [menu.menuId]: (value: string) => setMenuState(menu.menuId, value)
    }), {});

    const { 
        searchParams, handleTermChange, handleSortOptionChange, handleToggleDescending, handlePageChange
     } = usePageSearchControls(pageUIConfiguration.initialSearchParams ?? {});

    const { currentUser } = useCurrentUser();
    const { data, error, isLoading } = useSearchWorksByUserIdAndWorkType(currentUser?.id ?? 0, WorkType.Paper, searchParams ?? {}, !!currentUser?.id);

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

            {/* <WorkCardList
                data={data}
                error={error}
                searchParams={searchParams}
                isLoading={isLoading}
                menuStates={menuStates}
                handlePageChange={handlePageChange}
                disableViewMode={false}
            /> */}
            {data?.results.map((work) => (
                <div key={work.id}>
                    <p>{work.title}</p>
                </div>
            ))}

        </div>
    );
}