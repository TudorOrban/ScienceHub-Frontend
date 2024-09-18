
"use client";

import { getUserProfileBaseMenuConfiguration, getUserProfileMenuConfiguration } from "@/core/main/config/pagesUIConfigurations";
import UserProfileHeader from "@/core/user/components/user-profile/UserProfileHeader";
import NavigationMenu from "@/shared/common/components/NavigationMenu";
import { useUserProfileDetails } from "../../hooks/useUserProfileDetails";
import NotFoundFallback from "@/shared/error/components/NotFoundFallback";

export interface UserProfileWrapperProps {
    currentMenuItemValue: string;
    children: React.ReactNode;
}

const UserProfileWrapper = ({
    currentMenuItemValue,
    children,
}: UserProfileWrapperProps) => {
    const {
        areUsersAndCollaborationsChecked,
        isUserProfilePage,
        menuConfiguration,
        userDetailsResult,
    } = useUserProfileDetails(getUserProfileBaseMenuConfiguration(), true);

    if (areUsersAndCollaborationsChecked && !isUserProfilePage) {
        return (
            <NotFoundFallback message="User not found" />
        );
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