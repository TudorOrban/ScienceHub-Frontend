
"use client";

import { getUserProfileBaseMenuConfiguration, getUserProfileMenuConfiguration } from "@/core/main/config/pagesUIConfigurations";
import UserProfileHeader from "@/core/user/components/user-profile/UserProfileHeader";
import { useCurrentRouteIdentifierContext } from "@/core/user/contexts/CurrentRouteIdentifierContext";
import { useFetchUserDetails } from "@/core/user/hooks/useFetchUserDetails";
import NavigationMenu from "@/shared/common/components/NavigationMenu";
import { MenuConfiguration } from "@/shared/common/models/UITypes";
import { useEffect, useState } from "react";
import { useUserProfileDetails } from "../../hooks/useUserProfileDetails";
import { notFound } from "next/navigation";

export interface UserProfileWrapperProps {
    currentMenuItemValue: string;
    children: React.ReactNode;
}

const UserProfileWrapper = ({
    currentMenuItemValue,
    children,
}: UserProfileWrapperProps) => {
    const {
        usersAndCollaborations,
        areUsersAndCollaborationsChecked,
        isUserProfilePage,
        menuConfiguration,
        userDetailsResult,
    } = useUserProfileDetails(getUserProfileBaseMenuConfiguration(), true);

    if (areUsersAndCollaborationsChecked && !isUserProfilePage) {
        console.log("Users and collabs: ", usersAndCollaborations);
    }

    return (
        <div className="overflow-x-hidden">
            <UserProfileHeader result={userDetailsResult} />

            <div className="page-standard-horizontal-padding pt-4 page-header-bg">
                <NavigationMenu items={menuConfiguration?.items ?? []} defaultItemValue={currentMenuItemValue} useLinks={true} />
            </div>

            <div>
                {children}
            </div>
        </div>
    );
};

export default UserProfileWrapper;