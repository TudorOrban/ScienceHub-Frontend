import { QueryClient, QueryClientProvider, QueryClientProviderProps } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();

export default function ReactQueryProvider ({ children }: {children: React.ReactNode }) {
    const [client] = useState(new QueryClient());

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}