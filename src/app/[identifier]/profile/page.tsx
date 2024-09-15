"use client";

import { pagesUIConfigurations } from "@/core/main/config/pagesUIConfigurations";
import UserDetailsPanel from "@/core/user/components/UserDetailsPanel";
import UserProfileHeader from "@/core/user/components/UserProfileHeader";
import { useCurrentRouteIdentifierContext } from "@/core/user/contexts/CurrentRouteIdentifierContext";
import { useFetchUserDetails } from "@/core/user/hooks/useFetchUserDetails";
import NavigationMenus from "@/shared/common/components/NavigationMenus";
import { useMenuHandlers } from "@/shared/common/hooks/useMenuHandlers";

export default function UserProfilePage({
    params: { identifier },
}: {
    params: { identifier: string; };
}) {
    const pageUIConfiguration = pagesUIConfigurations["userProfile"];
    const { menuStates, setMenuState } = useMenuHandlers(pageUIConfiguration.menus ?? []);

    const menuSelectHandlers = (pageUIConfiguration.menus ?? []).reduce((acc, menu) => ({
        ...acc,
        [menu.menuId]: (value: string) => setMenuState(menu.menuId, value)
    }), {});

    const {
        usersAndCollaborations,
    } = useCurrentRouteIdentifierContext();

    const isUserProfilePage = usersAndCollaborations && (usersAndCollaborations?.users?.length ?? 0) == 1 && (usersAndCollaborations?.collaborations?.length ?? 0) === 0;

    const userDetailsResult = useFetchUserDetails(usersAndCollaborations?.users?.[0]?.id ?? 0, isUserProfilePage);

    if (!isUserProfilePage) {
        return <div>Invalid user profile page</div>
    }

    return (
        <div>
            <UserProfileHeader result={userDetailsResult} />

            <div className="page-standard-horizontal-padding pt-4">
                <NavigationMenus
                    menus={pageUIConfiguration.menus ?? []} 
                    menuSelectHandlers={menuSelectHandlers}
                />
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