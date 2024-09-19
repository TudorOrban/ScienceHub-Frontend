import { FieldValues, UseFormRegister } from "react-hook-form";
import { FormEnumItem, FormTextItem } from "../models/Form";

interface FormSelectFieldProps<TFieldValues extends FieldValues> {
    formItem?: FormEnumItem<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
    error?: string;
}

const FormSelectField = <TFieldValues extends FieldValues>({
    formItem,
    register,
    error,
}: FormSelectFieldProps<TFieldValues>) => {
    if (!formItem) {
        return null;
    }

    const { label, id, items } = formItem;

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={id} className="form-label">
                {label}
            </label>

            <select {...register(id)} className="form-input">
                {(items ?? []).map((item => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                )))}
            </select>
            {error && <p className="form-error-message">{error}</p>}
        </div>
    );
}

export default FormSelectField;