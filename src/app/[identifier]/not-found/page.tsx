import NotFoundFallback from "@/shared/error/components/NotFoundFallback";

/*
 * Default Fallback for 404 Page Not Found
 */
export default function NotFoundPage() {
    return (
        <NotFoundFallback message="Page not found."/>
    );
};
