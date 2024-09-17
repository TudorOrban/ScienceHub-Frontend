"use client";

import UserDetailsPanel from "./UserDetailsPanel";
import { useCurrentRouteIdentifierContext } from "@/core/user/contexts/CurrentRouteIdentifierContext";
import { useFetchUserDetails } from "@/core/user/hooks/useFetchUserDetails";

export interface UserProfileOverviewContentProps {
    
}

const UserProfileOverviewContent = ({

}: UserProfileOverviewContentProps) => {
    const {
        usersAndCollaborations,
    } = useCurrentRouteIdentifierContext();

    const isUserProfilePage = usersAndCollaborations && (usersAndCollaborations?.users?.length ?? 0) == 1 && (usersAndCollaborations?.collaborations?.length ?? 0) === 0;
    
    const userDetailsResult = useFetchUserDetails(usersAndCollaborations?.users?.[0]?.id ?? 0, isUserProfilePage);

    return (
        <div className="flex flex-row justify-between w-full">
            <div>
                Content
            </div>

            <UserDetailsPanel result={userDetailsResult} />
        </div>
    );
};

export default UserProfileOverviewContent;