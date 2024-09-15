"use client";

import UserProfileHeader from "@/core/user/components/UserProfileHeader";
import { useCurrentRouteIdentifierContext } from "@/core/user/contexts/CurrentRouteIdentifierContext";
import { useFetchUserDetails } from "@/core/user/hooks/useFetchUserDetails";

export default function UserProfilePage({
    params: { identifier },
}: {
    params: { identifier: string; };
}) {
    const {
        usersAndCollaborations,
    } = useCurrentRouteIdentifierContext();

    const isUserProfilePage = usersAndCollaborations && (usersAndCollaborations?.users?.length ?? 0) == 1 && (usersAndCollaborations?.collaborations?.length ?? 0) === 0;

    const userDetailsResult = useFetchUserDetails(usersAndCollaborations?.users?.[0]?.id ?? 0, isUserProfilePage);

    if (!isUserProfilePage) {
        return <div>Invalid user profile page</div>
    }

    return (
        <div>
            <UserProfileHeader result={userDetailsResult} />
        </div>
    )
}