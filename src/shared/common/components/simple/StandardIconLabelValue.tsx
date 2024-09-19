import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UIItem } from "../../models/UITypes";

export interface StandardIconLabelValueProps {
    item: UIItem;    
    size?: "small" | "medium" | "large";
}

const StandardIconLabelValue = ({ 
    item,
    size = "medium"
}: StandardIconLabelValueProps) => {

    const getCSSBySize = () => {
        if (size === "small") return "label-medium text-gray-800";
        if (size === "medium") return "label-medium-large text-gray-800";
        return "label-large text-gray-800";
    }

    if (!item) {
        return null;
    }

    return (
        <div className="flex items-center space-x-2 whitespace-nowrap">
            {item?.icon && (
                <FontAwesomeIcon icon={item?.icon} className="extra-small-icon text-gray-800" />
            )}
            <span 
                className={getCSSBySize()}
            >
                {item.label + ":"}
            </span>
            <p className="label-medium">{item.value}</p>
        </div>
    );
}

export default StandardIconLabelValue;