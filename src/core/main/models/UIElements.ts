import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Sidebar types
export enum PageDirectory {
    Home = "Home",
    Workspace = "Workspace",
    Browse = "Browse",
    Resources = "Resources",
    UserProfile = "User Profile",
    Project = "Project",
    NotFound = "Not Found"
}

export interface NavigationItem {
    label: string;
    icon?: IconDefinition;
    link?: string;
    value?: string;
    subItems?: NavigationItem[];
    selected?: boolean;
}