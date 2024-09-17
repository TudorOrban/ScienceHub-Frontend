import { UIItem } from "@/shared/common/models/UITypes";
import StandardIconLabelValue from "@/shared/common/components/simple/StandardIconLabelValue";

export interface UserMetricsPanelProps {
    metrics?: Record<string, UIItem>[];
}

const UserMetricsPanel = ({
    metrics = []
}: UserMetricsPanelProps) => {

    return (
        <div className="flex items-center space-x-12 pl-6 px-12 py-4 bg-white border border-gray-300 rounded-md shadow-sm">
            {metrics?.map((metricGroup, index) => (
                <div key={index} className="space-y-4">
                    {Object.keys(metricGroup).map((key) => (
                        <StandardIconLabelValue key={key} item={metricGroup[key]} size="small"/>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default UserMetricsPanel;