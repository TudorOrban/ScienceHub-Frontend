import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UIItem } from "../../models/UITypes";

export interface StandardTagProps {
    tag: UIItem;
}

const StandardTag = ({
    tag
}: StandardTagProps) => {

    return (
        <div className="flex items-center space-x-2 h-10 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
            {tag.icon && (
                <FontAwesomeIcon 
                    icon={tag.icon}     
                    className="small-icon" 
                    style={{ color: tag?.iconColor }}
                />
            )}
            <span className="px-4 py-2 text-sm font-semibold text-gray-700">{tag.label}</span>
        </div>
    );
};

export default StandardTag;