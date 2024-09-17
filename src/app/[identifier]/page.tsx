"use client";

import { getUserProfileBaseMenuConfiguration } from "@/core/main/config/pagesUIConfigurations";
import { useUserProfileDetails } from "@/core/user/hooks/useUserProfileDetails";
import { notFound } from "next/navigation";

export default function IdentifierPage() {
    const {
        isUserProfilePage,
        menuConfiguration,
        userDetailsResult,
    } = useUserProfileDetails(getUserProfileBaseMenuConfiguration(), true);

    if (!isUserProfilePage) {
        notFound();
    }

    return (
        <div>
            
        </div>
    );
};