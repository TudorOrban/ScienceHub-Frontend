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
        console.log("New identifier: ", newIdentifier);
        setCurrentRouteIdentifier(newIdentifier);
        
        const details = parseIdentifier(newIdentifier);
        setUsersAndCollaborations(details);
    }, [newIdentifier, setCurrentRouteIdentifier, setUsersAndCollaborations]);

    const usernames = usersAndCollaborations?.usernames || [];

    // Fetch the users
    const { data: users, isLoading, error } = useFetchUsersSmallByUsernames(usernames, usernames.length > 0);

    useEffect(() => {
        handleValidUsers();
    }, [users, isLoading, error, setPageDirectory, setCurrentRouteUsername, setUsersAndCollaborations]);

    const handleValidUsers = () => {
        if (isLoading) {
            return;
        }
        if (!users || users?.length != 1) {
            setCurrentRouteUsername(undefined);
            setUsersAndCollaborations({
                ...usersAndCollaborations,
                users: [],
            });
            return;
        }

        const updatedUsersAndCollaborations: IdentifierUsersAndCollaborations = {
            ...usersAndCollaborations,
            users: users as UserSmall[],
        };
        setUsersAndCollaborations(updatedUsersAndCollaborations);

        if (users.length === 1) {
            console.log("User found");
            setPageDirectory(PageDirectory.UserProfile);
            setCurrentRouteUsername(users[0].username);
        } else {
            setCurrentRouteUsername(undefined);
        }
    }

    return <div />;
};

export default IdentifierParser;
