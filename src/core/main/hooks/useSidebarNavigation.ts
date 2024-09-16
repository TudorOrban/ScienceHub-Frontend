import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PageDirectory, NavigationItem } from "../models/UIElements";
import { getNavigationItems } from "../config/sidebarNavigationItems";
import { useSidebarStateContext } from "../contexts/SidebarStateContext";
import { useCurrentRouteIdentifierContext } from "@/core/user/contexts/CurrentRouteIdentifierContext";
import { parseFeatureURLToIdentifier, parseIdentifier } from "@/shared/utils/featureURLParser";
import { useFetchUsersSmallByUsernames } from "@/core/user/hooks/useFetchUsersSmallByUsernames";
import { IdentifierUsersAndCollaborations } from "@/core/user/models/User";

export const useSidebarNavigation = () => {
    const { 
        pageDirectory, 
        setPageDirectory, 
        navigationItems, 
        setNavigationItems, 
        selectedItem, 
        setSelectedItem,
        currentRouteUsername,
        setCurrentRouteUsername,
        isDynamicRoute,
        setIsDynamicRoute,
    } = useSidebarStateContext();

    const {
        currentRouteIdentifier,
        setCurrentRouteIdentifier,
        usersAndCollaborations,
        setUsersAndCollaborations,
    } = useCurrentRouteIdentifierContext();

    const pathname = usePathname();

    useEffect(() => {
        const path = pathname.split("/");
        const currentPageDirectory = determinePageDirectory(path);
        
        if (currentPageDirectory !== PageDirectory.None) {
            setIsDynamicRoute(false);
            setPageDirectory(currentPageDirectory);

            const navigationItems = determineNavigationItems(currentPageDirectory, currentRouteUsername);
            setNavigationItems(navigationItems);
    
            const selectedItem = determineSelectedItem(pathname, navigationItems);
            setSelectedItem(selectedItem);

            setCurrentRouteIdentifier(undefined);
            setCurrentRouteUsername(undefined);
            setUsersAndCollaborations(undefined);
        } else {
            setIsDynamicRoute(true);

            const newIdentifier = parseFeatureURLToIdentifier(pathname);
            console.log("New identifier: ", newIdentifier);
            console.log("Current identifier: ", currentRouteIdentifier);
            if (newIdentifier === currentRouteIdentifier) {
                console.log("Identifier unchanged, skipping update.");
                return;
            }
            setCurrentRouteIdentifier(newIdentifier);
            const baseUsersAndCollaborations = parseIdentifier(newIdentifier);
            setUsersAndCollaborations(baseUsersAndCollaborations);
        }
    }, [pathname]);

    const { data: users, isLoading, error } = useFetchUsersSmallByUsernames(
        usersAndCollaborations?.usernames || [], 
        usersAndCollaborations?.usernames && usersAndCollaborations.usernames.length > 0
    );

    useEffect(() => {
        if (!isDynamicRoute) {
            return;
        }
        
        handleValidUsers();
    }, [users, isLoading, error]);

    const handleValidUsers = () => {
        if (isLoading) {
            return;
        }
        if (!users || users?.length !== 1) {
            console.log("No user found");
            setCurrentRouteUsername(undefined);
            setCurrentRouteIdentifier(undefined);
            setPageDirectory(PageDirectory.NotFound);
            setUsersAndCollaborations({
                ...usersAndCollaborations,
                users: [],
            });
            return;
        }

        console.log("User found");
        const updatedUsersAndCollaborations: IdentifierUsersAndCollaborations = {
            ...usersAndCollaborations,
            users: users,
        };
        setUsersAndCollaborations(updatedUsersAndCollaborations);

        setPageDirectory(PageDirectory.UserProfile);
        setCurrentRouteUsername(users[0].username);
        const navigationItems = determineNavigationItems(PageDirectory.UserProfile, users[0].username);
        setNavigationItems(navigationItems);

        const selectedItem = determineSelectedItem(pathname, navigationItems);
        setSelectedItem(selectedItem);
    }

    return { pageDirectory, navigationItems, selectedItem };
};

const determinePageDirectory = (path: string[]): PageDirectory => {
    switch (path[1]) {
        case "":
            return PageDirectory.Home;
        case "workspace":
            return PageDirectory.Workspace;
        case "browse":
            return PageDirectory.Browse;
        case "resources":
            return PageDirectory.Resources;
        default:
            return PageDirectory.None;
    }
};

const determineNavigationItems = (currentPageDirectory: PageDirectory, currentRouteUsername?: string): NavigationItem[] => {
    if (currentPageDirectory === PageDirectory.UserProfile) {
        return getNavigationItems(currentPageDirectory, currentRouteUsername);
    }
    if (currentPageDirectory === PageDirectory.Project) {
        return [];
    }
    return getNavigationItems(currentPageDirectory);
}

const determineSelectedItem = (pathname: string, navigationItems: NavigationItem[]): string => {
    let currentPathLabel = navigationItems.find((item) => item.link === pathname)?.label;
    if (!currentPathLabel) {
        for (const item of navigationItems) {
            currentPathLabel = (item?.subItems || []).find((subItem) => subItem.link === pathname)?.label;
            if (currentPathLabel) {
                break;
            }
        }
    }
    return currentPathLabel ?? "";
}