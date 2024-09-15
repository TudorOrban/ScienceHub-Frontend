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
            {children}
        </div>
    )
}

