import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PageDirectory, NavigationItem } from "../models/UIElements";
import { getNavigationItems } from "../config/sidebarNavigationItems";

export const useSidebarNavigation = () => {
    const [pageDirectory, setPageDirectory] = useState<PageDirectory>(PageDirectory.None);
    const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<string>("");

    const pathname = usePathname();

    useEffect(() => {
        const path = pathname.split("/");
        const currentPageDirectory = determinePageDirectory(path);
        setPageDirectory(currentPageDirectory);
        
        const navigationItems = determineNavigationItems(currentPageDirectory);
        setNavigationItems(navigationItems);

        const selectedItem = determineSelectedItem(pathname, navigationItems);
        setSelectedItem(selectedItem);
    }, [pathname]);

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
        case "user":
            return PageDirectory.UserProfile;
        case "project":
            return PageDirectory.Project;
        default:
            return PageDirectory.NotFound;
    }
};

const determineNavigationItems = (currentPageDirectory: PageDirectory): NavigationItem[] => {
    if (currentPageDirectory === PageDirectory.UserProfile) {
        return [];
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