import { createContext, ReactNode, useContext, useState } from "react";
import { UserSmall } from "../models/User";

export interface CurrentUserContextType {
    currentUser: UserSmall | null;
    setCurrentUser: (user: UserSmall | null) => void;
    isUserbarOpen?: boolean;
    setIsUserbarOpen?: (isOpen: boolean) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const useCurrentUser = () => {
    const context = useContext(CurrentUserContext);
    if (context === undefined) {
        throw new Error("useCurrentUser must be used within a CurrentUserProvider");
    }
    return context;
}

export const CurrentUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserSmall | null>(null);
    const [isUserbarOpen, setIsUserbarOpen] = useState<boolean>(false);

    return (
        <CurrentUserContext.Provider value={{ 
            currentUser, 
            setCurrentUser,
            isUserbarOpen,
            setIsUserbarOpen
        }}>
            {children}
        </CurrentUserContext.Provider>
    );
};
