"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormTextField from '@/shared/forms/components/FormTextField';
import FormSelectField from '@/shared/forms/components/FormEnumSelectField';
import FormUserSelection from '@/shared/forms/components/FormUserSelection';
import { useCurrentUser } from '@/core/user/contexts/CurrentUserContext';
import { useState } from 'react';
import { UserSmall } from '@/core/user/models/User';
import FormSwitchField from '@/shared/forms/components/FormSwitchField';
import { useRouter } from 'next/navigation';
import { constructFeatureURL } from '@/shared/utils/featureURLConstructor';
import { Feature } from '@/shared/common/models/Features';
import FormProjectSelection from '@/shared/forms/components/FormProjectSelection';
import { useToastsContext } from '@/shared/toasts/contexts/ToastsContext';
import { OperationOutcome } from '@/shared/toasts/models/Toast';
import { CreateIssueDTO, IssueType } from '../models/Issue';
import { ProjectSmall } from '@/features/research/projects/models/Project';
import { createIssue } from '../services/createIssue';
import { issueFormItemsConfig } from '../config/issueFormItemsConfig';

export interface IIssueFormInput {
    issueType: IssueType;
    title: string;
    description?: string;
    isPublic?: boolean;
}

const schema = yup.object({
    issueType: yup.mixed<IssueType>().oneOf(Object.values(IssueType)).required('Issue type is required'),
    title: yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters long')
        .max(50, 'Title must be at most 50 characters long'),
    description: yup.string(),
    isPublic: yup.boolean().required('Public is required'),
}).required();

export interface CreateIssueFormProps {

}

const CreateIssueForm = ({

}: CreateIssueFormProps) => {
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>(undefined);

    const router = useRouter();

    const {
        addToast
    } = useToastsContext();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IIssueFormInput>({
        resolver: yupResolver<IIssueFormInput>(schema)
    });

    const issueType = watch("issueType");
    
    const { currentUser } = useCurrentUser();
    
    const handleSelectedUsersChange = (users: UserSmall[]) => {
        setSelectedUserIds(users.map((u) => u.id));
    }

    const handleSelectedProjectChange = (project?: ProjectSmall) => {
        setSelectedProjectId(project?.id);
    }

    const onSubmit: SubmitHandler<IIssueFormInput> = async data => {
        if (!validateInput(data)) {
            return;
        }

        const createIssueDTO = getCreateIssueDTO(data);
        console.log("Create Issue DTO: ", createIssueDTO);

        const createdIssue = await createIssue(createIssueDTO);

        addToast({
            title: "Issue Created",
            message: "Issue has been created successfully",
            outcome: OperationOutcome.SUCCESS
        });

        const issueUrl = "http://localhost:3000" + constructFeatureURL(Feature.Issue, createdIssue?.data?.id.toString());
        router.push(issueUrl);
    }

    const validateInput = (data: IIssueFormInput): boolean => {
        const isValid = !!data && selectedUserIds?.find(u => u === currentUser?.id) !== undefined;
        return isValid;
    }

    const getCreateIssueDTO = (data: IIssueFormInput) => {
        const issueDTO: CreateIssueDTO = {
            issueType: data.issueType,
            projectId: selectedProjectId,
            title: data.title,
            description: data.description,
            isPublic: data?.isPublic ?? false,
            userIds: selectedUserIds,
            collaborationIds: [],
        };

        return issueDTO;
    }

    return (
        <div className="px-16 py-4">
            <h1 className="page-title py-6 text-center w-full">Create Issue</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                {/* Issue Type, Project and Is Public */}
                <div className="flex items-start flex-wrap lg:flex-nowrap lg:space-x-8">
                    <FormSelectField
                        formItem={issueFormItemsConfig.selectItems?.["issueType"] ?? undefined}
                        register={register}
                        error={errors?.issueType?.message}
                    />  

                    {issueType === 'ProjectIssue' && (
                        <FormProjectSelection
                            label="Project"
                            id="project"
                            currentUser={currentUser ?? undefined}
                            onSelectedProjectChange={handleSelectedProjectChange}
                        />
                    )}

                    <FormSwitchField
                        formItem={issueFormItemsConfig.switchItems?.["isPublic"] ?? undefined}
                        register={register}
                        error={errors?.isPublic?.message}
                    />
                </div>

                {/* Title, Description */}
                <FormTextField 
                    formItem={issueFormItemsConfig.textItems?.["title"]}
                    register={register}
                    error={errors?.title?.message}
                />

                <FormTextField 
                    formItem={issueFormItemsConfig.textItems?.["description"]}
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
                        Create Issue
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateIssueForm;