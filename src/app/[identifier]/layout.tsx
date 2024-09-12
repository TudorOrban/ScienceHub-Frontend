import IdentifierParser from "@/core/user/components/IdentifierParser";
import { CurrentRouteIdentifierProvider } from "@/core/user/contexts/CurrentRouteIdentifierContext";

export default async function IdentifierLayout({
    children,
    params: { identifier },
}: {
    children: React.ReactNode;
    params: {
        identifier: string;
    };
}) {
    return (
        <div>
            <CurrentRouteIdentifierProvider>
                <IdentifierParser />
                {children}
            </CurrentRouteIdentifierProvider>
        </div>
    )
}

