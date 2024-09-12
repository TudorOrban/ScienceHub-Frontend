"use client";

import { parseFeatureURLToIdentifier, parseIdentifier } from "@/shared/utils/featureURLParser";
import { useCurrentRouteIdentifierContext } from "../contexts/CurrentRouteIdentifierContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSidebarStateContext } from "@/core/main/contexts/SidebarStateContext";
import { fetchUsersSmallByUsernames } from "../services/fetchUsersSmallByUsernames";
import { Result } from "@/shared/http/Http";
import { UserSmall } from "../models/User";
import { PageDirectory } from "@/core/main/models/UIElements";

const IdentifierParser = () => {
    const pathname = usePathname();
    
    const {
        currentRouteIdentifier,
        setCurrentRouteIdentifier,
        usersAndCollaborations,
        setUsersAndCollaborations,
    } = useCurrentRouteIdentifierContext();
    
    const {
        pageDirectory,
        setPageDirectory,
        currentRouteUsername,
        setCurrentRouteUsername,
    } = useSidebarStateContext();

    useEffect(() => {
        handlePathnameChange();
    }, [pathname]);

    const handlePathnameChange = async () => {
        const usersResult = await determineIdentifierUsers();

        const isInvalid = isResultInvalid(usersResult);
        if (isInvalid) {
            return;
        }

        handleValidUsers(usersResult);
    }

    const determineIdentifierUsers = async () => {
        const newIdentifier = parseFeatureURLToIdentifier(pathname);
        setCurrentRouteIdentifier(newIdentifier);
        const newUsersAndCollaborations = parseIdentifier(newIdentifier);
        setUsersAndCollaborations(newUsersAndCollaborations);

        if (!newUsersAndCollaborations?.usernames || ((newUsersAndCollaborations?.usernames?.length ?? 0) === 0)) {
            return;
        }
        return await fetchUsersSmallByUsernames(newUsersAndCollaborations.usernames);
    }

    const isResultInvalid = (usersResult?: Result<UserSmall[]>): boolean => {
        if (!usersResult) {
            console.error("Invalid identifier");
            return true;
        }
        if (usersResult.error || !usersResult.data) {
            console.error("Error: ", usersResult.error);
            return true;
        }

        return false;
    }

    const handleValidUsers = (usersResult?: Result<UserSmall[]>) => {
        console.log("Users: ", usersResult?.data);
        setUsersAndCollaborations({
            ...usersAndCollaborations,
            users: usersResult?.data ?? [],
            collaborations: [],
        });

        if (usersResult?.data?.length === 1) {    
            setPageDirectory(PageDirectory.UserProfile);
            setCurrentRouteUsername(usersResult?.data?.[0]?.username);
        } else {
            setPageDirectory(PageDirectory.Workspace);
            setCurrentRouteUsername(undefined);
        }
    }

    return <div></div>;
};

export default IdentifierParser;
