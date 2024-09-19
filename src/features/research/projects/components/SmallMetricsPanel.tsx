import LoadingSkeleton from "@/shared/error/components/LoadingSkeleton";
import { faBookJournalWhills, faClipboardCheck, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SmallMetricsPanelProps {
    researchScore?: number;
    hIndex?: number;
    citationsCount?: number;
    isLoading?: boolean;
}

/**
 * Component for displaying a Project/Work's metrics, small version.
 */
const SmallMetricsPanel: React.FC<SmallMetricsPanelProps> = ({
    researchScore,
    hIndex,
    citationsCount,
    isLoading,
}) => {
    if (isLoading) {
        return <LoadingSkeleton isLoading={isLoading} />;
    }

    return (
        <>
            <div
                className="flex flex-col lg:flex-row items-center px-2 lg:space-x-2 bg-white border border-gray-300 shadow-sm rounded-md whitespace-nowrap text-base"
                style={{
                    fontSize: "0.9rem",
                    lineHeight: "1.35rem",
                    fontWeight: 500,
                }}
            >
                <div className="flex items-center px-3 py-1.5 border-r border-gray-200">
                    <FontAwesomeIcon
                        icon={faBookJournalWhills}
                        className="mr-2 text-gray-700"
                        style={{ width: "11px" }}
                    />
                    <span className="mr-1">Research Score: </span>
                    {researchScore ?? 0}
                </div>
                <div className="flex items-center p-1.5">
                    <FontAwesomeIcon
                        icon={faTableList}
                        className="mr-2 text-gray-700"
                        style={{ width: "13px" }}
                    />

                    <span className="mr-1">h-Index:</span>
                    {hIndex ?? 0}
                </div>
                <div className="flex items-center px-3 py-1.5 border-l border-gray-200">
                    <FontAwesomeIcon
                        icon={faClipboardCheck}
                        className="mr-2 text-gray-700"
                        style={{ width: "11px" }}
                    />
                    <span className="mr-1">Citations: </span>
                    {citationsCount ?? 0}
                </div>
            </div>
        </>
    );
};

export default SmallMetricsPanel;