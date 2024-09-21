import { FieldValues, UseFormRegister } from "react-hook-form";
import { FormSwitchItem } from "../models/Form";

export interface FormSwitchFieldProps<TFieldValues extends FieldValues> {
    formItem?: FormSwitchItem<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
    error?: string;
}

const FormSwitchField = <TFieldValues extends FieldValues>({
    formItem,
    register,
    error,
}: FormSwitchFieldProps<TFieldValues>) => {
    if (!formItem) {
        return null;
    }

    const { label, id } = formItem;

    return (
        <div className="flex flex-col space-y-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            
            <label className="custom-switch">
                <input 
                    type="checkbox" 
                    {...register(id)}
                />
                <span className="custom-slider round"></span>
            </label>

            {error && <p className="form-error-message">{error}</p>}
        </div>
    );
}

export default FormSwitchField;