"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { NavigationItem, PageDirectory } from "../models/UIElements";

export interface SidebarStateContextType {
    pageDirectory: PageDirectory;
    setPageDirectory: (pageDirectory: PageDirectory) => void;
    navigationItems: NavigationItem[];
    setNavigationItems: (navigationItems: NavigationItem[]) => void;
    selectedItem: string;
    setSelectedItem: (selectedItem: string) => void;
}

const SidebarStateContext = createContext<SidebarStateContextType | undefined>(undefined);

export const useSidebarStateContext = () => {
    const context = useContext(SidebarStateContext);
    if (context === undefined) {
        throw new Error("useSidebarState must be used within a SidebarStateProvider");
    }
    return context;
}

export const SidebarStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pageDirectory, setPageDirectory] = useState<PageDirectory>(PageDirectory.None);
    const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<string>("");

    return (
        <SidebarStateContext.Provider value={{ 
            pageDirectory,
            setPageDirectory,
            navigationItems,
            setNavigationItems,
            selectedItem,
            setSelectedItem
        }}>
            {children}
        </SidebarStateContext.Provider>
    );
};
