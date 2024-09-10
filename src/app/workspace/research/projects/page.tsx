"use client";

import { useSearchProjectsByUserId } from "@/features/research/projects/hooks/useSearchProjectsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import { UIItem } from "@/shared/common/models/UITypes";
import { SearchParams } from "@/shared/search/models/Search";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function ProjectsPage() {
    const pageTitle: UIItem = { label: "Projects", value: "", icon: faBoxArchive };
    const sortOptions: UIItem[] = [
        { label: "Created At", value: "createdAt" },
        { label: "Updated At", value: "updatedAt" },
        { label: "Name", value: "Name" },
    ];
    const createNewButtonData: UIItem = { label: "New Project", value: "", link: "/workspace/research/projects/create" };

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
            sortDescending: !prevParams.sortDescending
        }));
    }

    return (
        <div className="text-2xl overflow-x-hidden">
            <ListHeader 
                pageTitle={pageTitle}
                sortOptions={sortOptions}
                createNewButtonData={createNewButtonData}
                addBorder={false}
                searchParams={searchParams}
                onTermChange={handleTermChange}
                onSortOptionChange={handleSortOptionChange}
                onToggleDescending={handleToggleDescending}
            />

            {!isLoading && data?.results && data?.results.map(project => (
                <div key={project.id}>
                    {project.name}
                </div>
            ))}

        </div>
    );
}