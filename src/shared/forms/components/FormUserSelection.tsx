import { useSearchUsersSmallByUsername } from "@/core/user/hooks/useSearchUsersSmallByUsername";
import { UserSmall } from "@/core/user/models/User";
import SearchInput from "@/shared/common/components/SearchInput";
import { SearchParams } from "@/shared/search/models/Search";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export interface FormUserSelectionProps {
    label: string;
    id: string;
    initialUsers?: UserSmall[];
    currentUser?: UserSmall;
    error?: string;
    onSelectedUsersChange?: (users: UserSmall[]) => void;
}

const FormUserSelection = ({ 
    label, 
    id, 
    initialUsers,
    currentUser,
    error,
    onSelectedUsersChange
}: FormUserSelectionProps) => {
    const initialSearchParams = {
        searchTerm: "",
        page: 1,
        itemsPerPage: 10,
        sortBy: "createdAt",
        sortDescending: false,
    };

    const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);
    const [loadedUsers, setLoadedUsers] = useState<UserSmall[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<UserSmall[]>(initialUsers ?? []);
    const [isFocused, setIsFocused] = useState(false);
   
    const usersResult = useSearchUsersSmallByUsername(searchParams, true);

    useEffect(() => {
        setLoadedUsers([...loadedUsers, ...(usersResult.data?.results ?? [])]);
    }, [usersResult?.data, usersResult?.isLoading]);

    const handleTermChange = (term: string) => {
        setLoadedUsers([]);
        setSearchParams({
            ...searchParams,
            searchTerm: term,
            page: 1,
        });
    }

    const handleUserSelect = (user: UserSmall) => {
        if (selectedUsers.find((u) => u.id === user.id)) {
            return;
        }
        setSelectedUsers([...selectedUsers, user]);
        onSelectedUsersChange?.([...selectedUsers, user]);
    }

    const handleUnselectUser = (user: UserSmall) => {
        if (user.id === currentUser?.id) {
            return;
        }
        setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
        onSelectedUsersChange?.(selectedUsers.filter((u) => u.id !== user.id));
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
                        {loadedUsers
                            .filter((user) => !selectedUsers.find((u) => u.id === user.id))
                            .map((user) => (
                            <button 
                                type="button"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleUserSelect(user);
                                }}
                                key={user.id} 
                                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md shadow-sm text-gray-800 font-medium whitespace-nowrap"
                            >
                                {user.username}
                            </button>  
                        ))}

                        {(usersResult?.data?.totalCount ?? 0) > (searchParams.itemsPerPage ?? 0) * (searchParams.page ?? 0) && (
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

                <div className="flex flex-wrap py-2">
                    {selectedUsers
                        .map((user) => (
                        <div 
                            key={user.id} 
                            className="flex items-center justify-between space-x-4 px-4 py-2 max-w-40 bg-gray-50 border border-gray-200 rounded-md shadow-sm text-gray-800 font-medium whitespace-nowrap"
                        >
                            <h1>{user.username}</h1>
                            {currentUser?.id !== user.id && (
                                <button
                                    onClick={() => handleUnselectUser(user)}
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faXmark} className="small-icon hover:text-red-700" />   
                                </button>
                            )}
                        </div>
                    ))}
                </div>

            </div>
            
            {error && <p className="form-error-message">{error}</p>}
        </div>
    );
};

export default FormUserSelection;

