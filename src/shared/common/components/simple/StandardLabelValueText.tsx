
export interface StandardLabelValueTextProps {
    label: string;
    value?: string;
}

const StandardLabelValueText = ({ 
    label, 
    value 
}: StandardLabelValueTextProps) => {
    return (
        <div className="flex items-center space-x-2">
            <span className="label-medium-large text-gray-800">{label}</span>
            <p className="label-medium">{value}</p>
        </div>
    );
}

export default StandardLabelValueText;