import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PageDirectory, NavigationItem } from "../models/UIElements";
import { getNavigationItems } from "../config/sidebarNavigationItems";
import { useSidebarStateContext } from "../contexts/SidebarStateContext";

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
    } = useSidebarStateContext();

    const pathname = usePathname();

    useEffect(() => {
        const path = pathname.split("/");
        const currentPageDirectory = determinePageDirectory(path);
        setPageDirectory(currentPageDirectory);
        
    }, [pathname]);

    useEffect(() => { // Can get trigerred by IdentifierParser.tsx
        const navigationItems = determineNavigationItems(pageDirectory, currentRouteUsername);
        setNavigationItems(navigationItems);

        const selectedItem = determineSelectedItem(pathname, navigationItems);
        setSelectedItem(selectedItem);
    }, [pageDirectory]);

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
            return PageDirectory.NotFound; // Delegate dynamic routes to the CurrentRouteIdentifierParser
    }
};

const determineNavigationItems = (currentPageDirectory: PageDirectory, currentRouteUsername?: string): NavigationItem[] => {
    if (currentPageDirectory === PageDirectory.UserProfile) {
        return getNavigationItems(currentPageDirectory, currentRouteUsername, false);
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