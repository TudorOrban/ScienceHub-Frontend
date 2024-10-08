import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface StandardLabelValueTextProps {
    label: string;
    value?: string;
    icon?: IconDefinition;
    hideUndefined?: boolean;
    size?: "small" | "medium" | "large";
}

const StandardLabelValueText = ({ 
    label, 
    value,
    icon,
    hideUndefined = false,
    size = "medium"
}: StandardLabelValueTextProps) => {

    const getCSSBySize = () => {
        if (size === "small") return "label-medium text-gray-800";
        if (size === "medium") return "label-medium-large text-gray-800";
        return "label-large text-gray-800";
    }

    if (hideUndefined && !value) {
        return null;
    }

    return (
        <div className="flex items-center space-x-2">
            {icon && (
                <FontAwesomeIcon icon={icon} className="small-icon text-gray-800" />
            )}
            <span 
                className={getCSSBySize()}
            >
                {label + ":"}
            </span>
            <p className="label-medium">{value}</p>
        </div>
    );
}

export default StandardLabelValueText;