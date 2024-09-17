
export interface StandardLabelValuesProps {
    label: string;
    values?: string[];
    hideUndefined?: boolean;
}

const StandardLabelValues = ({ 
    label, 
    values,
    hideUndefined = false
}: StandardLabelValuesProps) => {
    if (hideUndefined && !values) {
        return null;
    }

    return (
        <div className="flex items-center flex-wrap">
            <span className="label-medium-large text-gray-800 mr-2">{label}</span>
            {(values ?? []).map((value, index) => (
                <div key={value} className="flex items-center">
                    <span className="label-medium whitespace-nowrap">{value}</span>
                    {index !== (values?.length ?? 0) - 1 && <span className="label-medium mr-2">{","}</span>}
                </div>
            ))}
        </div>
    );
}

export default StandardLabelValues;