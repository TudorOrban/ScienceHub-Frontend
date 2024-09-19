import { UseFormRegister, FieldValues, Path, RegisterOptions } from 'react-hook-form';

interface FormTextFieldProps<TFieldValues extends FieldValues> {
    label: string;
    id: Path<TFieldValues>;
    type?: string;
    register: UseFormRegister<TFieldValues>;
    options?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
    error?: string;
}

function FormTextField<TFieldValues extends FieldValues>({
    label,
    id,
    type = "text",
    register,
    options,
    error,
}: FormTextFieldProps<TFieldValues>) {
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
                className="form-input"
            />
            {error && <p className="form-error-message">{error}</p>}
        </div>
    );
}

export default FormTextField;