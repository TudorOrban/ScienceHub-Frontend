import { UserSmall } from "@/core/user/models/User";
import { useSearchProjectsByUserId } from "@/features/research/projects/hooks/useSearchProjectsByUserId";
import { ProjectSmall } from "@/features/research/projects/models/Project";
import SearchInput from "@/shared/common/components/SearchInput";
import { SearchParams } from "@/shared/search/models/Search";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export interface FormProjectSelectionProps {
    label: string;
    id: string;
    initialProject?: ProjectSmall;
    currentUser?: UserSmall;
    error?: string;
    onSelectedProjectChange?: (project?: ProjectSmall) => void;
}

const FormProjectSelection = ({ 
    label, 
    id, 
    initialProject,
    currentUser,
    error,
    onSelectedProjectChange
}: FormProjectSelectionProps) => {
    const initialSearchParams = {
        searchTerm: "",
        page: 1,
        itemsPerPage: 1,
        sortBy: "createdAt",
        sortDescending: false,
    };

    const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);
    const [loadedProjects, setLoadedProjects] = useState<ProjectSmall[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectSmall | undefined>(initialProject ?? undefined);
    const [isFocused, setIsFocused] = useState(false);
   
    const projectsResult = useSearchProjectsByUserId(currentUser?.id ?? 0, searchParams, !!currentUser?.id, true);

    useEffect(() => {
        setLoadedProjects([...loadedProjects, ...(projectsResult.data?.results ?? [])]);
    }, [projectsResult?.data]);

    const handleTermChange = (term: string) => {
        setLoadedProjects([]);
        setSearchParams({
            ...searchParams,
            searchTerm: term,
            page: 1,
        });
    }

    const handleProjectSelect = (project: ProjectSmall) => {
        if (selectedProject?.id === project.id) {
            return;
        }
        setSelectedProject(project);
        onSelectedProjectChange?.(project);
    }

    const handleUnselectProject = () => {
        setSelectedProject(undefined);
        onSelectedProjectChange?.(undefined);
    }

    const handleLoadMore = () => {
        setSearchParams({
            ...searchParams,
            page: (searchParams.page ?? 0) + 1,
        });
    }

    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="form-label pb-2">{label}</label>

            {!selectedProject && (
                <>
                    <SearchInput 
                        searchTerm={searchParams.searchTerm ?? ""}
                        onTermChange={handleTermChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        searchOnChange={false}
                    />

                    <div className="relative">
                        {isFocused && (
                            <div className="absolute flex flex-col bg-white border border-gray-200 rounded-md shadow-md w-64">
                                {loadedProjects
                                    .map((project) => (
                                    <button 
                                        type="button"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleProjectSelect(project);
                                        }}
                                        key={project.id} 
                                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md shadow-sm text-gray-800 font-medium whitespace-nowrap"
                                    >
                                        {project.name}
                                    </button>  
                                ))}

                                {(projectsResult?.data?.totalCount ?? 0) > (searchParams.itemsPerPage ?? 0) * (searchParams.page ?? 0) && (
                                    <button
                                        type="button"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleLoadMore();
                                        }}
                                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md shadow-sm text-gray-800 font-medium whitespace-nowrap"
                                    >
                                        Load More
                                    </button>   
                                )}
                            </div>    
                        )}
                    </div>
                </>
            )}

            {selectedProject && (
                <div className="flex flex-wrap">
                    <div 
                        className="flex items-center justify-between space-x-4 px-4 py-2 max-w-40 bg-gray-50 border border-gray-200 rounded-md shadow-sm text-gray-800 font-medium whitespace-nowrap"
                    >
                        <h1>{selectedProject?.name}</h1>
                        <button
                            onClick={handleUnselectProject}
                            type="button"
                        >
                            <FontAwesomeIcon icon={faXmark} className="small-icon hover:text-red-700" />   
                        </button>
                    </div>
                </div>   
            )}
            
            {error && <p className="form-error-message">{error}</p>}
        </div>
    );
};

export default FormProjectSelection;

