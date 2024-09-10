import { faQuestion, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { NavigationItem } from "../../models/UIElements";
import { CollapsedItems } from "../../models/UIElements";

export interface SidebarNavigationItemsProps {
    navigationItems: NavigationItem[];
    selectedItem: string;
    handleExpandItem: (itemLabel: string) => void;
    collapsedItems: CollapsedItems;
}

const SidebarNavigationItems = ({
    navigationItems,
    selectedItem,
    handleExpandItem,
    collapsedItems,
}: SidebarNavigationItemsProps) => {

    return (
        <div className="pl-6 pr-4 py-1 w-full h-full space-y-1">
            {navigationItems.map((item) => (
                <div key={item.label}>
                    <div className="flex items-center justify-between py-3">
                        <Link href={item?.link ?? ""} className="flex items-center space-x-3">
                            <FontAwesomeIcon
                                icon={item?.icon ?? faQuestion}
                                className="small-icon-white"
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
                                    className="small-icon-white"
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
                                        className="small-icon-white"
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
    );
}

export default SidebarNavigationItems;