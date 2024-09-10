
export interface LoadingSkeletonProps {
    isLoading?: boolean;
}

const LoadingSkeleton = ({
    isLoading
}: LoadingSkeletonProps) => {
    if (!isLoading) return null;

    return <div className="w-full mx-2 my-0.5 h-6 bg-gray-300 rounded-md shadow-sm animate-pulse"></div>;
}

export default LoadingSkeleton;