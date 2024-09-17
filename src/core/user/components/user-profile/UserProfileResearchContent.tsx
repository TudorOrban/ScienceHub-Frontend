"use client";

import { getUserProfileBaseMenuConfiguration } from "@/core/main/config/pagesUIConfigurations";
import { useUserProfileDetails } from "../../hooks/useUserProfileDetails";
import UserDetailsPanel from "./UserDetailsPanel";

export interface UserProfileResearchContentProps {
    
}

const UserProfileResearchContent = ({

}: UserProfileResearchContentProps) => {
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

export default UserProfileResearchContent;