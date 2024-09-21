import { CurrentUserProvider } from "@/core/user/contexts/CurrentUserContext"
import { SidebarStateProvider } from "../contexts/SidebarStateContext"
import { CurrentRouteIdentifierProvider } from "@/core/user/contexts/CurrentRouteIdentifierContext";
import { ToastsProvider } from "@/shared/toasts/contexts/ToastsContext";

export default function ContextProviders({ children }: { children: React.ReactNode }) {
    return (
        <SidebarStateProvider>
            <CurrentUserProvider>            
                <CurrentRouteIdentifierProvider>
                    <ToastsProvider>
                        {children}
                    </ToastsProvider>
                </CurrentRouteIdentifierProvider>
            </CurrentUserProvider>
        </SidebarStateProvider>
    );
}