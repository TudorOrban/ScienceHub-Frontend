
"use client";

import { getUserProfileBaseNavigationItems, getUserProfileNavigationItems } from "@/core/main/config/pagesUIConfigurations";
import UserProfileHeader from "@/core/user/components/user-profile/UserProfileHeader";
import { useCurrentRouteIdentifierContext } from "@/core/user/contexts/CurrentRouteIdentifierContext";
import { useFetchUserDetails } from "@/core/user/hooks/useFetchUserDetails";
import NavigationMenu from "@/shared/common/components/NavigationMenu";
import { MenuConfiguration } from "@/shared/common/models/UITypes";
import { useEffect, useState } from "react";

export interface UserProfileWrapperProps {
    currentMenuItemValue: string;
    children: React.ReactNode;
}

const UserProfileWrapper = ({
    currentMenuItemValue,
    children,
}: UserProfileWrapperProps) => {
    const baseNavigationItems = getUserProfileBaseNavigationItems();

    const [isUserProfilePage, setIsUserProfilePage] = useState<boolean | undefined>(undefined);
    const [menuConfiguration, setMenuConfiguration] = useState<MenuConfiguration>(baseNavigationItems);

    const {
        usersAndCollaborations,
    } = useCurrentRouteIdentifierContext();

    useEffect(() => {
        const newIsUserProfilePage = usersAndCollaborations && (usersAndCollaborations?.users?.length ?? 0) == 1 && (usersAndCollaborations?.collaborations?.length ?? 0) === 0;
        setIsUserProfilePage(newIsUserProfilePage);
        const newMenuConfiguration = newIsUserProfilePage ? getUserProfileNavigationItems(usersAndCollaborations?.users?.[0]?.username ?? "", "overview") : baseNavigationItems;
        setMenuConfiguration(newMenuConfiguration);
    }, [usersAndCollaborations]);

    const userDetailsResult = useFetchUserDetails(usersAndCollaborations?.users?.[0]?.id ?? 0, isUserProfilePage);

    return (
        <div className="overflow-x-hidden">
            <UserProfileHeader result={userDetailsResult} />

            <div className="page-standard-horizontal-padding pt-4">
                <NavigationMenu items={menuConfiguration?.items ?? []} defaultItemValue={currentMenuItemValue} useLinks={true} />
            </div>

            <div>
                {children}
            </div>
        </div>
    );
};

export default UserProfileWrapper;