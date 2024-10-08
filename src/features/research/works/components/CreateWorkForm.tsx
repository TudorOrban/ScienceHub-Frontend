"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormTextField from '@/shared/forms/components/FormTextField';
import { CreateWorkDTO, WorkType } from '../models/Work';
import FormSelectField from '@/shared/forms/components/FormEnumSelectField';
import FormUserSelection from '@/shared/forms/components/FormUserSelection';
import { useCurrentUser } from '@/core/user/contexts/CurrentUserContext';
import { useState } from 'react';
import { UserSmall } from '@/core/user/models/User';
import FormSwitchField from '@/shared/forms/components/FormSwitchField';
import { createWork } from '../services/createWork';
import { useRouter } from 'next/navigation';
import { constructFeatureURL } from '@/shared/utils/featureURLConstructor';
import { Feature } from '@/shared/common/models/Features';
import FormProjectSelection from '@/shared/forms/components/FormProjectSelection';
import { ProjectSmall } from '../../projects/models/Project';
import { useToastsContext } from '@/shared/toasts/contexts/ToastsContext';
import { OperationOutcome } from '@/shared/toasts/models/Toast';
import { workFormItemsConfig } from '../config/workFormItemsConfig';

export interface IWorkFormInput {
    workType: WorkType;
    title: string;
    name: string;
    description?: string;
    isPublic?: boolean;
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
    isPublic: yup.boolean().required('Public is required'),
}).required();

export interface CreateWorkFormProps {

}

const CreateWorkForm = ({

}: CreateWorkFormProps) => {
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>(undefined);

    const router = useRouter();

    const {
        addToast
    } = useToastsContext();

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

    const handleSelectedProjectChange = (project?: ProjectSmall) => {
        setSelectedProjectId(project?.id);
    }

    const onSubmit: SubmitHandler<IWorkFormInput> = async data => {
        if (!validateInput(data)) {
            return;
        }

        const createWorkDTO = getCreateWorkDTO(data);
        console.log("Create Work DTO: ", createWorkDTO);

        const createdWork = await createWork(createWorkDTO);

        addToast({
            title: "Work Created",
            message: "Work has been created successfully",
            outcome: OperationOutcome.SUCCESS
        });

        const workUrl = "http://localhost:3000" + constructFeatureURL(Feature.Work, createdWork?.data?.id.toString());
        router.push(workUrl);
    }

    const validateInput = (data: IWorkFormInput): boolean => {
        const isValid = !!data && selectedUserIds?.find(u => u === currentUser?.id) !== undefined;
        return isValid;
    }

    const getCreateWorkDTO = (data: IWorkFormInput) => {
        const workDTO: CreateWorkDTO = {
            workType: data.workType,
            projectId: selectedProjectId,
            title: data.title,
            name: data.name,
            description: data.description,
            isPublic: data?.isPublic ?? false,
            workMetadata: undefined,
            fileLocation: undefined,
            userIds: selectedUserIds,
            collaborationIds: [],
        };

        return workDTO;
    }

    return (
        <div className="px-16 py-4">
            <h1 className="page-title py-4 text-center w-full">Create Work</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                {/* Work Type, Project and Is Public */}
                <div className="flex items-start flex-wrap lg:flex-nowrap lg:space-x-8">
                    <FormSelectField
                        formItem={workFormItemsConfig.selectItems?.["workType"] ?? undefined}
                        register={register}
                        error={errors?.workType?.message}
                    />  

                    <FormProjectSelection
                        label="Project"
                        id="project"
                        currentUser={currentUser ?? undefined}
                        onSelectedProjectChange={handleSelectedProjectChange}
                    />

                    <FormSwitchField
                        formItem={workFormItemsConfig.switchItems?.["isPublic"] ?? undefined}
                        register={register}
                        error={errors?.isPublic?.message}
                    />
                </div>

                {/* Title, Name, Description */}
                <div className="flex items-start flex-wrap space-x-8">
                    <FormTextField 
                        formItem={workFormItemsConfig.textItems?.["title"]}
                        register={register}
                        error={errors?.title?.message}
                    />
                    <FormTextField 
                        formItem={workFormItemsConfig.textItems?.["name"]}
                        register={register}
                        error={errors?.name?.message}
                    />
                </div>

                <FormTextField 
                    formItem={workFormItemsConfig.textItems?.["description"]}
                    register={register}
                    error={errors?.description?.message}
                />

                {/* Users */}
                <FormUserSelection 
                    label="Users" 
                    id="users" 
                    initialUsers={currentUser ? [currentUser] : []}
                    currentUser={currentUser ?? undefined}
                    onSelectedUsersChange={handleSelectedUsersChange}
                />

                <div className="flex items-center justify-end w-full pt-4">
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