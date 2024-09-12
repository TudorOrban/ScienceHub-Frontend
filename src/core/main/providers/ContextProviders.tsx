import { CurrentUserProvider } from "@/core/user/contexts/CurrentUserContext"
import { SidebarStateProvider } from "../contexts/SidebarStateContext"

export default function ContextProviders({ children }: { children: React.ReactNode }) {
    return (
        <SidebarStateProvider>
            <CurrentUserProvider>
                {children}
            </CurrentUserProvider>
        </SidebarStateProvider>
    );
}