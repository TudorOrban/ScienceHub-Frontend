import { FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface FormItem<TFieldValues extends FieldValues> {
    label: string;
    id: Path<TFieldValues>;
    type?: string;
    options?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
    error?: string;
}