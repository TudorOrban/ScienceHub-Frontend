"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown, faCaretUp, faQuestion } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

import { useSidebarNavigation } from "../hooks/useSidebarNavigation";

interface CollapsedItems {
    [key: string]: boolean;
}

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
            <div className="collapsed-sidebar shadow-md">
                <div className="w-full h-12 flex items-center justify-center border-b border-gray-700">
                    <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>

                <div className="p-4 w-full h-full space-y-8">
                    {navigationItems.map((item) => (
                        <div key={item.label}>
                            <Link href={item?.link ?? ""} className="flex items-center justify-center w-full space-x-3">
                                <FontAwesomeIcon
                                    icon={item?.icon ?? faQuestion}
                                    className="small-icon"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="sidebar shadow-md">
            <div className="w-full h-14 flex items-center justify-between border-b border-gray-700">
                <div className="flex-1 flex items-center justify-center">
                    <h1 className="text-2xl font-semibold">{pageDirectory}</h1>
                </div>
                <button className="mr-4" onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>

            <div className="pl-6 pr-4 py-1 w-full h-full space-y-1">
                {navigationItems.map((item) => (
                    <div key={item.label}>
                        <div className="flex items-center justify-between py-3">
                            <Link href={item?.link ?? ""} className="flex items-center space-x-3">
                                <FontAwesomeIcon
                                    icon={item?.icon ?? faQuestion}
                                    className="small-icon"
                                />
                                <div 
                                    className={`${selectedItem === item.label ? "text-blue-600" : ""} hover:text-blue-600`}
                                >
                                    {item.label}
                                </div>
                            </Link>

                            {item?.subItems && (
                                <button onClick={() => handleExpandItem(item.label)}>
                                    <FontAwesomeIcon
                                        icon={!collapsedItems[item.label] ? faCaretUp : faCaretDown}
                                        className="small-icon"
                                    />
                                </button>
                            )}
                        </div>

                        {!collapsedItems[item.label] && item?.subItems && (
                            <div className="flex flex-col px-4 space-y-2">
                            {(item.subItems ?? []).map((subItem, index) => (
                                    <Link
                                        key={subItem.label}
                                        href={subItem.link ?? ""}
                                        className={`flex items-center space-x-3 py-2 hover:text-white ${
                                            index === 0 ? "pt-3" : ""
                                        }`}
                                    >
                                        <FontAwesomeIcon
                                            icon={subItem?.icon ?? faQuestion}
                                            className="small-icon"
                                        />
                                        <div 
                                            className={`${selectedItem === subItem.label ? "text-blue-600" : ""} hover:text-blue-600`}
                                        >
                                            {subItem.label}
                                        </div>
                                    </Link>
                                ))}
                        </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
