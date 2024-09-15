"use client";

import { parseFeatureURLToIdentifier, parseIdentifier } from "@/shared/utils/featureURLParser";
import { useCurrentRouteIdentifierContext } from "../contexts/CurrentRouteIdentifierContext";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useSidebarStateContext } from "@/core/main/contexts/SidebarStateContext";
import { IdentifierUsersAndCollaborations, UserSmall } from "../models/User";
import { PageDirectory } from "@/core/main/models/UIElements";
import { useFetchUsersSmallByUsernames } from "../hooks/useFetchUsersSmallByUsernames";

const IdentifierParser = () => {
    const pathname = usePathname();
    
    const {
        setCurrentRouteIdentifier,
        usersAndCollaborations,
        setUsersAndCollaborations,
    } = useCurrentRouteIdentifierContext();
    
    const {
        setPageDirectory,
        setCurrentRouteUsername,
    } = useSidebarStateContext();

    const newIdentifier = useMemo(() => parseFeatureURLToIdentifier(pathname), [pathname]);
    
    // Update currentRouteIdentifier and usersAndCollaborations based on newIdentifier
    useEffect(() => {
        setCurrentRouteIdentifier(newIdentifier);
        
        const details = parseIdentifier(newIdentifier);
        setUsersAndCollaborations(details);
    }, [newIdentifier, setCurrentRouteIdentifier, setUsersAndCollaborations]);

    const usernames = usersAndCollaborations?.usernames || [];

    // Use React Query hook to fetch the users
    const { data: users, isLoading, error } = useFetchUsersSmallByUsernames(usernames, usernames.length > 0);

    useEffect(() => {
        handleValidUsers();
    }, [users, isLoading, error, setPageDirectory, setCurrentRouteUsername, setUsersAndCollaborations]);

    const handleValidUsers = () => {
        if (isLoading || !users) {
            return;
        }

        const updatedUsersAndCollaborations: IdentifierUsersAndCollaborations = {
            ...usersAndCollaborations,
            users: users as UserSmall[],
        };
        setUsersAndCollaborations(updatedUsersAndCollaborations);

        if (users.length === 1) {
            setPageDirectory(PageDirectory.UserProfile);
            setCurrentRouteUsername(users[0].username);
        } else {
            setPageDirectory(PageDirectory.Workspace);
            setCurrentRouteUsername(undefined);
        }
    }

    return <div />;
};

export default IdentifierParser;
