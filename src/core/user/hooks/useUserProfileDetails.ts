import { MenuConfiguration } from "@/shared/common/models/UITypes";
import { useEffect, useState } from "react";
import { useCurrentRouteIdentifierContext } from "../contexts/CurrentRouteIdentifierContext";
import { getUserProfileMenuConfiguration } from "@/core/main/config/pagesUIConfigurations";
import { useFetchUserDetails } from "./useFetchUserDetails";

export const useUserProfileDetails = (baseMenuConfiguration: MenuConfiguration, useMenu?: boolean) => {
    const [isUserProfilePage, setIsUserProfilePage] = useState<boolean | undefined>(undefined);
    const [menuConfiguration, setMenuConfiguration] = useState<MenuConfiguration>(baseMenuConfiguration);

    const {
        usersAndCollaborations,
        areUsersAndCollaborationsChecked
    } = useCurrentRouteIdentifierContext();

    useEffect(() => {
        const newIsUserProfilePage = usersAndCollaborations && (usersAndCollaborations?.users?.length ?? 0) == 1 && (usersAndCollaborations?.collaborations?.length ?? 0) === 0;
        console.log("Is user profile page: ", newIsUserProfilePage);
        console.log("Users and collabs in hook: ", usersAndCollaborations);
        setIsUserProfilePage(newIsUserProfilePage);
        if (newIsUserProfilePage && useMenu) {
            const newMenuConfiguration = getUserProfileMenuConfiguration(usersAndCollaborations?.users?.[0]?.username ?? "");
            setMenuConfiguration(newMenuConfiguration);
        }
    }, [usersAndCollaborations]);

    const userDetailsResult = useFetchUserDetails(usersAndCollaborations?.users?.[0]?.id ?? 0, isUserProfilePage);

    return { usersAndCollaborations, areUsersAndCollaborationsChecked, isUserProfilePage, menuConfiguration, userDetailsResult };
}