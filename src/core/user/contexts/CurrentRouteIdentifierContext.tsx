"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { IdentifierUsersAndCollaborations } from "../models/User";

export interface CurrentRouteIdentifierContextType {
    currentRouteIdentifier: string | undefined;
    setCurrentRouteIdentifier: (identifier: string | undefined) => void;
    usersAndCollaborations: IdentifierUsersAndCollaborations | undefined;
    setUsersAndCollaborations: (usersAndCollaborations: IdentifierUsersAndCollaborations | undefined) => void;
}

const CurrentRouteIdentifierContext = createContext<CurrentRouteIdentifierContextType | undefined>(undefined);

export const useCurrentRouteIdentifierContext = () => {
    const context = useContext(CurrentRouteIdentifierContext);
    if (context === undefined) {
        throw new Error("useCurrentRouteIdentifier must be used within a CurrentRouteIdentifierProvider");
    }
    return context;
}

export const CurrentRouteIdentifierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentRouteIdentifier, setCurrentRouteIdentifier] = useState<string | undefined>(undefined);
    const [usersAndCollaborations, setUsersAndCollaborations] = useState<IdentifierUsersAndCollaborations | undefined>({});

    return (
        <CurrentRouteIdentifierContext.Provider value={{ 
            currentRouteIdentifier, 
            setCurrentRouteIdentifier,
            usersAndCollaborations,
            setUsersAndCollaborations
        }}>
            {children}
        </CurrentRouteIdentifierContext.Provider>
    );
};
