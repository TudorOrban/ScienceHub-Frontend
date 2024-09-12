"use client";

import { parseFeatureURLToIdentifier, parseIdentifier } from "@/shared/utils/featureURLParser";
import { useCurrentRouteIdentifierContext } from "../contexts/CurrentRouteIdentifierContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSidebarNavigation } from "@/core/main/hooks/useSidebarNavigation";
import { useSidebarStateContext } from "@/core/main/contexts/SidebarStateContext";

const IdentifierParser = () => {
    const pathname = usePathname();
    
    const context = useCurrentRouteIdentifierContext();
    const {
        currentRouteIdentifier,
        setCurrentRouteIdentifier,
        usersAndCollaborations,
        setUsersAndCollaborations,
    } = context;
    
    const {
        pageDirectory,
        setPageDirectory,
    } = useSidebarStateContext();

    useEffect(() => {
        const identifier = parseFeatureURLToIdentifier(pathname);
        setCurrentRouteIdentifier(identifier);
        const usersAndCollaborations = parseIdentifier(identifier);
        setUsersAndCollaborations(usersAndCollaborations);
        
    }, [pathname]);

    return <div></div>;
};

export default IdentifierParser;
