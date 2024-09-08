import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faQuestion } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import { NavigationItem } from "../../models/UIElements";

export interface CollapsedSidebarProps {
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
    navigationItems: NavigationItem[];
}

const CollapsedSidebar = ({
    isSidebarExpanded,
    setIsSidebarExpanded,
    navigationItems,
}: CollapsedSidebarProps) => {
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
};

export default CollapsedSidebar;