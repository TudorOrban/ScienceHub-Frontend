"use client";

import { getUserProfileBaseNavigationItems, getUserProfileNavigationItems } from "@/core/main/config/pagesUIConfigurations";
import UserDetailsPanel from "@/core/user/components/user-profile/UserDetailsPanel";
import UserProfileHeader from "@/core/user/components/user-profile/UserProfileHeader";
import { useCurrentRouteIdentifierContext } from "@/core/user/contexts/CurrentRouteIdentifierContext";
import { useFetchUserDetails } from "@/core/user/hooks/useFetchUserDetails";
import NavigationMenu from "@/shared/common/components/NavigationMenu";
import { MenuConfiguration } from "@/shared/common/models/UITypes";
import { useEffect, useState } from "react";

export default function UserCommunityPage({
    params: { identifier },
}: {
    params: { identifier: string; };
}) {
    const baseNavigationItems = getUserProfileBaseNavigationItems();
    
    const [isUserProfilePage, setIsUserProfilePage] = useState<boolean | undefined>(undefined);
    const [menuConfiguration, setMenuConfiguration] = useState<MenuConfiguration>(baseNavigationItems);

    const {
        usersAndCollaborations,
    } = useCurrentRouteIdentifierContext();

    useEffect(() => {
        const newIsUserProfilePage = usersAndCollaborations && (usersAndCollaborations?.users?.length ?? 0) == 1 && (usersAndCollaborations?.collaborations?.length ?? 0) === 0;
        setIsUserProfilePage(newIsUserProfilePage);
        const newMenuConfiguration = newIsUserProfilePage ? getUserProfileNavigationItems(usersAndCollaborations?.users?.[0]?.username ?? "", "research") : baseNavigationItems;
        setMenuConfiguration(newMenuConfiguration);
    }, [usersAndCollaborations]);

    const userDetailsResult = useFetchUserDetails(usersAndCollaborations?.users?.[0]?.id ?? 0, isUserProfilePage);

    return (
        <div>
            <UserProfileHeader result={userDetailsResult} />

            <div className="page-standard-horizontal-padding pt-4">
                <NavigationMenu items={menuConfiguration?.items ?? []} defaultItemValue={"community"} useLinks={true} />
            </div>

            <div className="flex flex-row justify-between w-full">
                <div>
                    Content
                </div>

                <UserDetailsPanel result={userDetailsResult} />
            </div>
        </div>
    )
}