import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { FormTextItem } from '../models/Form';

interface FormTextFieldProps<TFieldValues extends FieldValues> {
    formItem?: FormTextItem<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
    error?: string;
}

function FormTextField<TFieldValues extends FieldValues>({
    formItem,
    register,
    error,
}: FormTextFieldProps<TFieldValues>) {
    if (!formItem) {
        return null;
    }

    const { label, id, type, options } = formItem;

    if (type === "textarea") {
        return (
            <div className="flex flex-col space-y-2">
                <label htmlFor={id} className="form-label">
                    {label}
                </label>
                <textarea
                    id={id}
                    {...register(id, options)}
                    className="form-input"
                />
                {error && <p className="form-error-message">{error}</p>}
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type={type}
                id={id}
                {...register(id, options)}
                className="form-input max-w-80"
            />
            {error && <p className="form-error-message">{error}</p>}
        </div>
    );
}

export default FormTextField;