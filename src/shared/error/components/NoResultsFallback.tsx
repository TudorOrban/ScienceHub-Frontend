
export interface NoResultsFallbackProps {
}

const NoResultsFallback = ({
}: NoResultsFallbackProps) => {

    return (
        <div className="w-full h-96 flex flex-col items-center justify-center">
            <h2 className="page-title">
                {"No Results match your search."}
            </h2>
        </div>
    );
};

export default NoResultsFallback;