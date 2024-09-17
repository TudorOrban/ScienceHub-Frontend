"use client";

import { getUserProfileBaseMenuConfiguration } from "@/core/main/config/pagesUIConfigurations";
import { useUserProfileDetails } from "../../hooks/useUserProfileDetails";
import UserDetailsPanel from "./UserDetailsPanel";

export interface UserProfileOverviewContentProps {
    
}

const UserProfileOverviewContent = ({

}: UserProfileOverviewContentProps) => {
    const {
        userDetailsResult,
    } = useUserProfileDetails(getUserProfileBaseMenuConfiguration(), false);

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