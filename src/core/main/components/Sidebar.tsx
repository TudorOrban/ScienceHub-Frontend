"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown, faCaretUp, faQuestion } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

import { useSidebarNavigation } from "../hooks/handleSidebarNavigation";

interface ExpandedItems {
    [key: string]: boolean;
}

const Sidebar = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

    const { pageDirectory, navigationItems } = useSidebarNavigation();

    const handleExpandItem = (itemLabel: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [itemLabel]: !prev[itemLabel],
        }));
    };

    if (!isSidebarExpanded) {
        return (
            <div>
                <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
        );
    }

    return (
        <div className="sidebar shadow-md">
            <div className="w-full h-12 flex items-center justify-between border-b border-gray-700">
                <div className="flex-1 flex items-center justify-center">
                    <h1 className="text-xl font-semibold">{pageDirectory}</h1>
                </div>
                <button className="mr-4" onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>

            <div className="pl-6 pr-4 py-4 w-full h-full space-y-4">
                {navigationItems.map((item) => (
                    <div key={item.label}>
                        <div className="flex items-center justify-between">
                            <Link href={item?.link ?? ""} className="flex items-center space-x-3">
                                <FontAwesomeIcon
                                    icon={item?.icon ?? faQuestion}
                                    className="small-icon"
                                />
                                <div className="hover:text-white">{item.label}</div>
                            </Link>

                            {item?.subItems && (
                                <button onClick={() => handleExpandItem(item.label)}>
                                    <FontAwesomeIcon
                                        icon={expandedItems[item.label] ? faCaretUp : faCaretDown}
                                        className="small-icon"
                                    />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col px-4 py-2 space-y-2">
                            {expandedItems[item.label] &&
                                (item.subItems ?? []).map((subItem, index) => (
                                    <Link
                                        key={subItem.label}
                                        href={subItem.link ?? ""}
                                        className={`flex items-center space-x-3 py-2 hover:text-white ${
                                            index === 0 ? "pt-4" : ""
                                        }`}
                                    >
                                        <FontAwesomeIcon
                                            icon={subItem?.icon ?? faQuestion}
                                            className="small-icon"
                                        />
                                        <div className="hover:text-white">{subItem.label}</div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
