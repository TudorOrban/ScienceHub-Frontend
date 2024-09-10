"use client";

import { pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import ProjectMediumCard from "@/features/research/projects/components/ProjectMediumCard";
import { useSearchProjectsByUserId } from "@/features/research/projects/hooks/useSearchProjectsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import NavigationMenu from "@/shared/common/components/NavigationMenu";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import PageSelector from "@/shared/common/components/PageSelector";
import { UIItem } from "@/shared/common/models/UITypes";
import { SearchParams } from "@/shared/search/models/Search";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function ProjectsPage() {
    const pageUIConfiguration = pagesUIConfigurations["projects"];

    const userId = 1;
    const [searchParams, setSearchParams] = useState<SearchParams>({
        searchTerm: "",
        sortBy: "createdAt",
        sortDescending: true,
        page: 1,
        itemsPerPage: 1,
    });

    const { data, error, isLoading } = useSearchProjectsByUserId(userId, searchParams, !!userId);

    const handleTermChange = (term: string) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            searchTerm: term
        }));
    }

    const handleSortOptionChange = (sortOption: string) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            sortBy: sortOption
        }));
    }
    
    const handleToggleDescending = () => {
        setSearchParams(prevParams => ({
            ...prevParams,
            sortDescending: !prevParams?.sortDescending
        }));
    }

    const handlePageChange = (page: number) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            page: page
        }));
    }

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

            <NavigationMenus menus={pageUIConfiguration.menus ?? []} />

            <div className="page-standard-horizontal-padding py-4">
                {!isLoading && data?.results && data?.results.map(project => (
                    <ProjectMediumCard key={project.id} project={project} />
                ))}
            </div>

            <div className="flex justify-end page-standard-horizontal-padding">
                <PageSelector currentPage={searchParams?.page} itemsPerPage={searchParams?.itemsPerPage} totalCount={data?.totalCount ?? 0} onPageChange={handlePageChange} />
            </div>

        </div>
    );
}