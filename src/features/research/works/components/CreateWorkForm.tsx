"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormTextField from '@/shared/forms/components/FormTextField';
import { workFormItemsConfig } from '@/shared/forms/config/formItemsConfig';
import { CreateWorkDTO, WorkType } from '../models/Work';
import FormSelectField from '@/shared/forms/components/FormEnumSelectField';
import FormUserSelection from '@/shared/forms/components/FormUserSelection';
import { useCurrentUser } from '@/core/user/contexts/CurrentUserContext';
import { useState } from 'react';
import { UserSmall } from '@/core/user/models/User';

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
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IWorkFormInput>({
        resolver: yupResolver<IWorkFormInput>(schema)
    });
    
    const { currentUser } = useCurrentUser();

    const handleSelectedUsersChange = (users: UserSmall[]) => {
        setSelectedUserIds(users.map((u) => u.id));
    }

    const onSubmit: SubmitHandler<IWorkFormInput> = data => {
        if (!validateInput(data)) {
            return;
        }
        
        const createWorkDTO = getCreateWorkDTO(data);

        console.log("Create Work DTO: ", createWorkDTO);
    }

    const validateInput = (data: IWorkFormInput): boolean => {
        const isValid = !!data && selectedUserIds?.find(u => u === currentUser?.id) !== undefined;
        return isValid;
    }

    const getCreateWorkDTO = (data: IWorkFormInput) => {
        const workDTO: CreateWorkDTO = {
            workType: data.workType,
            title: data.title,
            name: data.name,
            description: data.description,
            isPublic: true,
            workMetadata: undefined,
            fileLocation: undefined,
            userIds: selectedUserIds,
            collaborationIds: [],
        };

        return workDTO;
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
                    onSelectedUsersChange={handleSelectedUsersChange}
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