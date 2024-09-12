"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { IdentifierUsersAndCollaborations } from "../models/User";

export interface CurrentRouteIdentifierContextType {
    currentRouteIdentifier: string;
    setCurrentRouteIdentifier: (user: string) => void;
    usersAndCollaborations: IdentifierUsersAndCollaborations;
    setUsersAndCollaborations: (usersAndCollaborations: IdentifierUsersAndCollaborations) => void;
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
    const [currentRouteIdentifier, setCurrentRouteIdentifier] = useState<string>("");
    const [usersAndCollaborations, setUsersAndCollaborations] = useState<IdentifierUsersAndCollaborations>({});

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
