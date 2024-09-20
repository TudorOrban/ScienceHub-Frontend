import { UIItem } from '@/shared/common/models/UITypes';
import { FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface FormConfig<TFieldValues extends FieldValues> {
    textItems?: Record<string, FormTextItem<TFieldValues>>; // key: item id
    selectItems?: Record<string, FormEnumItem<TFieldValues>>; // key: item id
    switchItems?: Record<string, FormSwitchItem<TFieldValues>>; // key: item id
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

export interface FormSwitchItem<TFieldValues extends FieldValues> {
    label: string;
    id: Path<TFieldValues>;
    options?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
    error?: string;
}