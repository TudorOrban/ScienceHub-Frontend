"use client";

import React from "react";
import ReactQueryProvider from "../clients/reactQueryClient";
/**
 * The global providers for the website
 */
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
    );
}
