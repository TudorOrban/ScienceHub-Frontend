import { StandardAPIError } from "@/shared/http/Http";

export interface ErrorFallbackProps {
    error?: StandardAPIError;
}

const ErrorFallback = ({
    error,
}: ErrorFallbackProps) => {

    return (
        <div className="w-full h-96 flex flex-col items-center justify-center">
            <h2 className="page-title">
                {error?.message ?? "An error occurred"}
            </h2>
        </div>
    );
};

export default ErrorFallback;