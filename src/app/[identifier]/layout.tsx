
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
            <h1>{identifier}</h1>
            {children}
        </div>
    )
}

