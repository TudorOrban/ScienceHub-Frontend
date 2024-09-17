
export interface StandardLabelValueTextProps {
    label: string;
    value?: string;
    hideUndefined?: boolean;
    size?: "small" | "medium" | "large";
}

const StandardLabelValueText = ({ 
    label, 
    value,
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