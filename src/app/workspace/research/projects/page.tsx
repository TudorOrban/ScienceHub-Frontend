"use client";

import { pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import ProjectMediumCard from "@/features/research/projects/components/ProjectMediumCard";
import { useSearchProjectsByUserId } from "@/features/research/projects/hooks/useSearchProjectsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import PageSelector from "@/shared/common/components/PageSelector";
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
    console.log("Data: ", data);

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

            <div className="page-standard-horizontal-padding py-4 space-y-4">
                {!isLoading && data?.results && data?.results.map(project => (
                    <ProjectMediumCard 
                        key={project.id} 
                        project={project} 
                        viewMode={menuStates?.["Expand/Collapse"] === "expanded" ? "expanded" : "collapsed"}
                    />
                ))}
            </div>

            <div className="flex justify-end page-standard-horizontal-padding">
                <PageSelector currentPage={searchParams?.page} itemsPerPage={searchParams?.itemsPerPage} totalCount={data?.totalCount ?? 0} onPageChange={handlePageChange} />
            </div>

        </div>
    );
}