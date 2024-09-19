import { UIItem } from '@/shared/common/models/UITypes';
import { FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface FormConfig<TFieldValues extends FieldValues, SFieldValues extends FieldValues> {
    textItems?: FormTextItem<TFieldValues>[];
    selectItems?: FormEnumItem<SFieldValues>[];
}

export interface FormTextItem<TFieldValues extends FieldValues> {
    label: string;
    id: Path<TFieldValues>;
    type?: string;
    options?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
    error?: string;
}

export interface FormEnumItem<TFieldValues extends FieldValues> {
    label: string;
    id: Path<TFieldValues>;
    items?: UIItem[];
    error?: string;
}