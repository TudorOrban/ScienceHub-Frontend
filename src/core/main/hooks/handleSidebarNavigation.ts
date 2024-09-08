import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PageDirectory, NavigationItem } from "../models/UIElements";
import { getNavigationItems } from "../config/sidebarNavigationItems";

export const useSidebarNavigation = () => {
    const [pageDirectory, setPageDirectory] = useState<PageDirectory>(PageDirectory.Home);
    const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);

    const pathname = usePathname();

    useEffect(() => {
        const path = pathname.split("/");
        const currentPageDirectory = determinePageDirectory(path);
        setPageDirectory(currentPageDirectory);
        
        if (currentPageDirectory === PageDirectory.UserProfile) {
            setNavigationItems([]);
            return;
        }
        if (currentPageDirectory === PageDirectory.Project) {
            setNavigationItems([]);
            return;
        }
        const navigationItems = getNavigationItems(currentPageDirectory);
        setNavigationItems(navigationItems);
    }, [pathname]);

    return { pageDirectory, navigationItems };
};

const determinePageDirectory = (path: string[]): PageDirectory => {
    switch (path[1]) {
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
            return PageDirectory.Home;
    }
};