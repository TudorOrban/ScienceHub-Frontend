import { CurrentUserProvider } from "@/core/user/contexts/CurrentUserContext"

export default function ContextProviders({ children }: { children: React.ReactNode }) {
    return (
        <CurrentUserProvider>
            {children}
        </CurrentUserProvider>
    );
}