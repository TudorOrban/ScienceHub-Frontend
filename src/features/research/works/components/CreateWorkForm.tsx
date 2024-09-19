"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormTextField from '@/shared/forms/components/FormTextField';
import { workFormItemsConfig } from '@/shared/forms/config/formItemsConfig';
import { WorkType } from '../models/Work';
import FormSelectField from '@/shared/forms/components/FormEnumSelectField';
import FormUserSelection from '@/shared/forms/components/FormUserSelection';
import { useCurrentUser } from '@/core/user/contexts/CurrentUserContext';

export interface IWorkFormInput {
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
    const { currentUser } = useCurrentUser();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IWorkFormInput>({
        resolver: yupResolver<IWorkFormInput>(schema)
    });

    const onSubmit: SubmitHandler<IWorkFormInput> = data => {
        console.log("Submit: ", data);
    }

    return (
        <div className="flex flex-col items-center w-full px-16 py-4">
            <h1 className="page-title py-4">Create Work</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                {/* Work Type */}
                <FormSelectField
                    formItem={workFormItemsConfig.selectItems?.[0] ?? undefined}
                    register={register}
                    error={errors?.workType?.message}
                />    

                {/* Title, Name, Description */}
                {(workFormItemsConfig.textItems ?? []).map((item) => (
                    <FormTextField
                        key={item.id}
                        formItem={item}
                        register={register}
                        error={errors?.[item.id]?.message}
                    />
                ))}

                {/* Users */}
                <FormUserSelection 
                    label="Users" 
                    id="users" 
                    initialUsers={currentUser ? [currentUser] : []}
                    currentUser={currentUser ?? undefined}
                />

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