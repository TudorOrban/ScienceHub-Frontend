import { CurrentUserProvider } from "@/core/user/contexts/CurrentUserContext"
import { SidebarStateProvider } from "../contexts/SidebarStateContext"
import { CurrentRouteIdentifierProvider } from "@/core/user/contexts/CurrentRouteIdentifierContext";

export default function ContextProviders({ children }: { children: React.ReactNode }) {
    return (
        <SidebarStateProvider>
            <CurrentUserProvider>            
                <CurrentRouteIdentifierProvider>
                    {children}
                </CurrentRouteIdentifierProvider>
            </CurrentUserProvider>
        </SidebarStateProvider>
    );
}