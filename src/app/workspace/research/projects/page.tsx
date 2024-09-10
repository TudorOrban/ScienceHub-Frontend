"use client";

import { useSearchProjectsByUserId } from "@/features/research/projects/hooks/useSearchProjectsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import { UIItem } from "@/shared/common/models/UITypes";
import { SearchParams } from "@/shared/search/models/Search";
import { useState } from "react";


export default function ProjectsPage() {
    const sortOptions: UIItem[] = [
        { label: "Created At", value: "createdAt" },
        { label: "Updated At", value: "updatedAt" },
        { label: "Name", value: "Name" },
    ];
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

    console.log(data, error, isLoading);

    return (
        <div className="text-2xl overflow-x-hidden">
            <ListHeader 
                title="Projects"
                searchParams={searchParams}
                sortOptions={sortOptions}
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