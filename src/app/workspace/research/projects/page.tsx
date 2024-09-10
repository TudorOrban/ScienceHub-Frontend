"use client";

import { pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import ProjectMediumCard from "@/features/research/projects/components/ProjectMediumCard";
import { useSearchProjectsByUserId } from "@/features/research/projects/hooks/useSearchProjectsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import PageSelector from "@/shared/common/components/PageSelector";
import { SearchParams } from "@/shared/search/models/Search";
import { useState } from "react";


export default function ProjectsPage() {
    const pageUIConfiguration = pagesUIConfigurations["projects"];
    const [expandedCollapsedCurrentValue, setExpandedCollapsedCurrentValue] = useState<"expanded" | "collapsed">("expanded");
    const [mainAuthorContributorCurrentValue, setMainAuthorContributorCurrentValue] = useState<"mainAuthor" | "contributor">("mainAuthor");

    const handleChangeExpandedCollapsed = (value: string) => {
        if (value === "expanded" || value === "collapsed") {
            console.log(value);
            setExpandedCollapsedCurrentValue(value);
        }
    }

    const handleChangeMainAuthorContributor = (value: string) => {
        if (value === "mainAuthor" || value === "contributor") {
            console.log(value);
            setMainAuthorContributorCurrentValue(value);
        }
    }

    const handleMenuSelectHandlers = {
        "Expand/Collapse": handleChangeExpandedCollapsed,
        "Main Author/Contributor": handleChangeMainAuthorContributor
    };

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

            <div className="page-standard-horizontal-padding pt-4">
                <NavigationMenus 
                    menus={pageUIConfiguration.menus ?? []} 
                    menuSelectHandlers={handleMenuSelectHandlers}
                />
            </div>

            <div className="page-standard-horizontal-padding py-4 space-y-4">
                {!isLoading && data?.results && data?.results.map(project => (
                    <ProjectMediumCard 
                        key={project.id} 
                        project={project} 
                        viewMode={expandedCollapsedCurrentValue}
                    />
                ))}
            </div>

            <div className="flex justify-end page-standard-horizontal-padding">
                <PageSelector currentPage={searchParams?.page} itemsPerPage={searchParams?.itemsPerPage} totalCount={data?.totalCount ?? 0} onPageChange={handlePageChange} />
            </div>

        </div>
    );
}