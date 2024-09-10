"use client";

import { useSearchProjectsByUserId } from "@/features/research/projects/hooks/useSearchProjectsByUserId";
import ListHeader from "@/shared/common/components/ListHeader";
import { SearchParams } from "@/shared/search/models/Search";
import { useState } from "react";


export default function ProjectsPage() {
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
    
    const handleToggleDescending = () => {
        setSearchParams(prevParams => ({
            ...prevParams,
            sortDescending: !prevParams.sortDescending
        }));
    }

    console.log(data, error, isLoading);

    return (
        <div className="text-2xl">
            <ListHeader 
                title="Projects"
                searchParams={searchParams}
                onTermChange={handleTermChange}
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