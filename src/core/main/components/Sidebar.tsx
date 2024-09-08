"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PageDirectory } from "../models/UIElements";

const Sidebar = () => {
    const [pageDirectory, setPageDirectory] = useState<PageDirectory>(PageDirectory.Home);
    const pathname = usePathname();

    useEffect(() => {
        const path = pathname.split("/");
        setPageDirectory(getPageDirectory(path));
    }, [pathname]);

    const getPageDirectory = (path: string[]): PageDirectory => {
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
    }

    return (
        <div className="sidebar shadow-md">
            <div className="w-full h-12 flex items-center justify-center border-b border-gray-700">
                <h1 className="text-xl font-semibold">{pageDirectory}</h1>
            </div>

            <div className="w-full h-20 flex items-center justify-center border-b border-gray-700">
                <h1 className="text-2xl font-semibold">Sidebar</h1>
            </div>
        </div>
    );
}

export default Sidebar;