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
        pageDirectory, setPageDirectory, 
        navigationItems, setNavigationItems, 
        selectedItem, setSelectedItem,
        currentRouteUsername, setCurrentRouteUsername,
        isDynamicRoute, setIsDynamicRoute,
    } = useSidebarStateContext();

    const {
        currentRouteIdentifier, setCurrentRouteIdentifier,
        usersAndCollaborations, setUsersAndCollaborations,
    } = useCurrentRouteIdentifierContext();

    const pathname = usePathname();

    useEffect(() => {
        const path = pathname.split("/");
        const currentPageDirectory = determinePageDirectory(path);
        
        if (currentPageDirectory !== PageDirectory.None) {
            handleStaticRoute(currentPageDirectory);
        } else {
            handleDynamicRoute();
        }
    }, [pathname]);

    // Static route handling
    const handleStaticRoute = (currentPageDirectory: PageDirectory) => {
        setPageDirectory(currentPageDirectory);

        const navigationItems = determineNavigationItems(currentPageDirectory, currentRouteUsername);
        setNavigationItems(navigationItems);

        const selectedItem = determineSelectedItem(pathname, navigationItems);
        setSelectedItem(selectedItem);

        clearDynamicRouteContext();
    }

    const clearDynamicRouteContext = () => {
        setIsDynamicRoute(false);
        setCurrentRouteIdentifier(undefined);
        setCurrentRouteUsername(undefined);
        setUsersAndCollaborations(undefined);
    }

    // Dynamic route handling
    const handleDynamicRoute = () => {
        setIsDynamicRoute(true);

        // Attempt to parse URL into usernames and collaboration names
        const newIdentifier = parseFeatureURLToIdentifier(pathname);
        if (newIdentifier === currentRouteIdentifier) {
            return;
        }
        setCurrentRouteIdentifier(newIdentifier);

        const baseUsersAndCollaborations = parseIdentifier(newIdentifier);
        setUsersAndCollaborations(baseUsersAndCollaborations); // Triggers useFetchUsersSmallByUsernames hook
    }

    const { data: users, isLoading, error } = useFetchUsersSmallByUsernames(
        usersAndCollaborations?.usernames || [], 
        usersAndCollaborations?.usernames && usersAndCollaborations.usernames.length > 0
    );

    useEffect(() => {
        handleUsersSmallResponse();
    }, [users, isLoading, error]);

    const handleUsersSmallResponse = () => {
        if (!isDynamicRoute) {
            return;
        }
        if (isLoading) {
            return;
        }
        if (!users || users?.length === 0) {
            handleInvalidUsers();
            return;
        }
        if (users?.length !== 1) {
            handleMultipleUsers();
        }
        
        handleValidUser();
    }

    const handleInvalidUsers = () => {
        setCurrentRouteUsername(undefined);
        setCurrentRouteIdentifier(undefined);
        setPageDirectory(PageDirectory.NotFound);
        setUsersAndCollaborations({
            ...usersAndCollaborations,
            users: [],
        });
    }

    const handleMultipleUsers = () => {
        handleInvalidUsers(); // To be replaced once project/work/.. dynamic routes are added
    }

    const handleValidUser = () => {
        const updatedUsersAndCollaborations: IdentifierUsersAndCollaborations = {
            ...usersAndCollaborations,
            users: users,
        };
        setUsersAndCollaborations(updatedUsersAndCollaborations);

        setPageDirectory(PageDirectory.UserProfile);
        setCurrentRouteUsername(users?.[0].username);
        const navigationItems = determineNavigationItems(PageDirectory.UserProfile, users?.[0].username);
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