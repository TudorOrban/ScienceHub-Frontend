import { useSearchUsersSmallByUsername } from "@/core/user/hooks/useSearchUsersSmallByUsername";
import { UserSmall } from "@/core/user/models/User";
import SearchInput from "@/shared/common/components/SearchInput";
import { SearchParams } from "@/shared/search/models/Search";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export interface FormUserSelectionProps {
    label: string;
    id: string;
    initialUsers?: UserSmall[];
    currentUser?: UserSmall;
    error?: string;
}

const FormUserSelection = ({ 
    label, 
    id, 
    initialUsers,
    currentUser,
    error,
}: FormUserSelectionProps) => {
    const initialSearchParams = {
        searchTerm: "",
        page: 1,
        itemsPerPage: 10,
        sortBy: "createdAt",
        sortDescending: false,
    };

    const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);
    const [selectedUsers, setSelectedUsers] = useState<UserSmall[]>(initialUsers ?? []);

    const usersResult = useSearchUsersSmallByUsername(searchParams, true);

    console.log(usersResult);

    const handleTermChange = (term: string) => {
        setSearchParams({
            ...searchParams,
            searchTerm: term,
        });
    }

    const handleUserSelect = (user: UserSmall) => {
        if (selectedUsers.find((u) => u.id === user.id)) {
            return;
        }
        setSelectedUsers([...selectedUsers, user]);
    }

    const handleUnselectUser = (user: UserSmall) => {
        if (selectedUsers.find((u) => u.id === currentUser?.id)) {
            return;
        }
        setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    }

    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="form-label pb-2">{label}</label>

            <SearchInput 
                searchTerm={searchParams.searchTerm ?? ""}
                onTermChange={handleTermChange}
                searchOnChange={false}
            />

            <div className="relative">
                <div className="absolute flex flex-col bg-white border border-gray-200 rounded-md shadow-md w-64">
                    {(usersResult?.data?.results ?? [])
                        .filter((user) => !selectedUsers.find((u) => u.id === user.id))
                        .map((user) => (
                        <button 
                            type="button"
                            onClick={() => handleUserSelect(user)}
                            key={user.id} 
                            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md shadow-sm text-gray-800 font-medium whitespace-nowrap"
                        >
                            {user.username}
                        </button>  
                    ))}
                </div>

                <div>
                    {selectedUsers
                        .map((user) => (
                        <button 
                            onClick={() => handleUnselectUser(user)}
                            type="button"
                            key={user.id} 
                            className="flex items-center justify-between space-x-4 px-4 py-2 max-w-40 bg-gray-50 border border-gray-200 rounded-md shadow-sm text-gray-800 font-medium whitespace-nowrap"
                        >
                            {user.username}
                            {currentUser?.id !== user.id && (
                                <FontAwesomeIcon icon={faXmark} className="small-icon hover:text-red-700" />   
                            )}
                        </button>
                    ))}
                </div>

            </div>
            
            {/* {error && <p className="form-error-message">{error}</p>} */}
        </div>
    );
};

export default FormUserSelection;

