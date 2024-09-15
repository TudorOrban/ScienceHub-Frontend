"use client";

import { getUserProfileNavigationItems } from "@/core/main/config/pagesUIConfigurations";
import UserDetailsPanel from "@/core/user/components/UserDetailsPanel";
import UserProfileHeader from "@/core/user/components/UserProfileHeader";
import { useCurrentRouteIdentifierContext } from "@/core/user/contexts/CurrentRouteIdentifierContext";
import { useFetchUserDetails } from "@/core/user/hooks/useFetchUserDetails";
import NavigationMenu from "@/shared/common/components/NavigationMenu";

export default function UserManagementPage({
    params: { identifier },
}: {
    params: { identifier: string; };
}) {
    const {
        usersAndCollaborations,
    } = useCurrentRouteIdentifierContext();

    const isUserProfilePage = usersAndCollaborations && (usersAndCollaborations?.users?.length ?? 0) == 1 && (usersAndCollaborations?.collaborations?.length ?? 0) === 0;
    const menuConfiguration = isUserProfilePage ? getUserProfileNavigationItems(usersAndCollaborations?.users?.[0]?.username ?? "", "management") : {
        menuId: "",
        items: [],
    };

    const userDetailsResult = useFetchUserDetails(usersAndCollaborations?.users?.[0]?.id ?? 0, isUserProfilePage);

    return (
        <div>
            <UserProfileHeader result={userDetailsResult} />

            <div className="page-standard-horizontal-padding pt-4">
                <NavigationMenu items={menuConfiguration?.items ?? []} defaultItemValue={menuConfiguration?.defaultItemValue} useLinks={true} />
            </div>

            <div className="flex flex-row justify-between w-full">
                <div>
                    Content for Management
                </div>

                <UserDetailsPanel result={userDetailsResult} />
            </div>
        </div>
    )
}