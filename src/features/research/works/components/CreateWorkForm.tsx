"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormTextField from '@/shared/forms/components/FormTextField';

interface IFormInput {
    title: string;
    description?: string;
}

const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().min(10, 'Description must be at least 10 characters'),
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
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data);
    }

    return (
        <div className="flex flex-col items-center w-full page-standard-horizontal-padding py-4">
            <h1 className="page-title py-4">Create Work</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormTextField
                    label="Title"
                    id="title"
                    register={register}
                    options={{ required: "Title is required" }}
                    error={errors.title?.message}
                />
                <FormTextField
                    label="Description"
                    id="description"
                    type="textarea"
                    register={register}
                    options={{
                        required: "Description is required",
                        minLength: { value: 10, message: "Description must be at least 10 characters long" }
                    }}
                    error={errors.description?.message}
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