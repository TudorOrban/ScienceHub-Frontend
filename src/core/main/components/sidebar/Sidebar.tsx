"use client";

import { useState } from "react";

import { useSidebarNavigation } from "../../hooks/useSidebarNavigation";
import CollapsedSidebar from "./CollapsedSidebar";
import SidebarDropdown from "./SidebarDropdown";
import SidebarNavigationItems from "./SidebarNavigationItems";
import { CollapsedItems } from "../../models/UIElements";

const Sidebar = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [collapsedItems, setCollapsedItems] = useState<CollapsedItems>({});

    const { pageDirectory, navigationItems, selectedItem } = useSidebarNavigation();

    const handleExpandItem = (itemLabel: string) => {
        setCollapsedItems((prev) => ({
            ...prev,
            [itemLabel]: !prev[itemLabel],
        }));
    };

    if (!isSidebarExpanded) {
        return (
            <CollapsedSidebar 
                navigationItems={navigationItems} 
                isSidebarExpanded={isSidebarExpanded} 
                setIsSidebarExpanded={setIsSidebarExpanded} 
            />
        );
    }

    return (
        <div className="sidebar shadow-md">
            <SidebarDropdown 
                pageDirectory={pageDirectory} 
                isSidebarExpanded={isSidebarExpanded}
                setIsSidebarExpanded={setIsSidebarExpanded} 
            />

            <SidebarNavigationItems 
                navigationItems={navigationItems} 
                selectedItem={selectedItem} 
                handleExpandItem={handleExpandItem} 
                collapsedItems={collapsedItems}
            />
        </div>
    );
};

export default Sidebar;
