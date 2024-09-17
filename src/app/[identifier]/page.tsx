"use client";

import { getUserProfileBaseMenuConfiguration } from "@/core/main/config/pagesUIConfigurations";
import { useUserProfileDetails } from "@/core/user/hooks/useUserProfileDetails";
import { useRouter } from "next/navigation";

export default function IdentifierPage() {
    const router = useRouter();

    const {
        areUsersAndCollaborationsChecked,
        isUserProfilePage,
        menuConfiguration,
        userDetailsResult,
    } = useUserProfileDetails(getUserProfileBaseMenuConfiguration(), true);

    if (areUsersAndCollaborationsChecked && !isUserProfilePage) {
        router.push("/user-not-found");
    }

    return (
        <div>

        </div>
    );
};