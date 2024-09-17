
export interface NotFoundFallbackProps {
    message?: string;
}
const NotFoundFallback = ({
    message,
}: NotFoundFallbackProps) => {
    return (
        <div className="text-black flex items-center justify-center w-full h-full py-40 overflow-y-hidden">
            <h1 className="text-2xl font-semibold">{message ?? ""}</h1>
        </div>
    );
};

export default NotFoundFallback;