"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormTextField from '@/shared/forms/components/FormTextField';
import { workFormItemsConfig } from '@/shared/forms/config/formItemsConfig';
import { WorkType } from '../models/Work';

export interface IFormInput {
    workType: WorkType;
    title: string;
    name: string;
    description?: string;
}

const schema = yup.object({
    workType: yup.mixed<WorkType>().oneOf(Object.values(WorkType)).required('Work type is required'),
    title: yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters long')
        .max(50, 'Title must be at most 50 characters long'),
    name: yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters long')
        .max(50, 'Name must be at most 50 characters long'),
    description: yup.string(),
}).required();

export interface CreateWorkFormProps {

}

const CreateWorkForm = ({

}: CreateWorkFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>({
        resolver: yupResolver<IFormInput>(schema)
    });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data);
    }

    return (
        <div className="flex flex-col items-center w-full page-standard-horizontal-padding py-4">
            <h1 className="page-title py-4">Create Work</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                {/* Work Type */}
                <div className="flex flex-col space-y-2">
                <label htmlFor="workType" className="form-label">Work Type</label>
                    <select
                        {...register('workType')}
                        className="form-input"
                    >
                        {Object.values(WorkType).map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {errors.workType && <p className="form-error-message">{errors.workType.message}</p>}

                </div>

                {/* Title, Name, Description */}
                {workFormItemsConfig.map((item) => (
                    <FormTextField
                        key={item.id}
                        formItem={item}
                        register={register}
                        error={errors?.[item.id]?.message}
                    />
                ))}

                <div className="flex items-center justify-end w-full">
                    <button
                        type="submit"
                        className="standard-write-button"
                    >
                        Create Work
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateWorkForm;