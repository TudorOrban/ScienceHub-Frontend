import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/shadcn-ui/components/ui/tooltip";
import { UIItem } from "../../models/UITypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
  
export interface StandardButtonProps {
    item: UIItem;
    mode?: "icon-only" | "icon-label";
    isSelected?: boolean;
    onClick?: () => void;
}

const StandardButton = ({
    item,
    mode = "icon-label",
    isSelected = false,
    onClick,
}: StandardButtonProps) => {
    const buttonClass = `flex items-center justify-center standard-button ${
        isSelected ? "bg-gray-50" : "bg-white"
    }`;

    const iconClass = `small-icon hover:text-blue-700 ${
        isSelected ? "text-blue-700" : "text-gray-800"
    }`;

    if (mode === "icon-only") {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button 
                            onClick={onClick}
                            className={buttonClass}
                        >
                            <FontAwesomeIcon 
                                icon={item.icon ?? faQuestion} 
                                className={iconClass}
                            />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {item.label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    } else {
        return (
            <button 
                onClick={onClick}
                className={buttonClass}
            >
                <FontAwesomeIcon 
                    icon={item.icon ?? faQuestion} 
                    className={iconClass}
                />
                <span className="label-medium">{item.label}</span>
            </button>
        );
    }
};

export default StandardButton;