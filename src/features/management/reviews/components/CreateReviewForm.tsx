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
import { CreateReviewDTO, ReviewType } from '../models/Review';
import { ProjectSmall } from '@/features/research/projects/models/Project';
import { createReview } from '../services/createReview';
import { reviewFormItemsConfig } from '../config/reviewFormItemsConfig';

export interface IReviewFormInput {
    reviewType: ReviewType;
    title: string;
    description?: string;
    isPublic?: boolean;
}

const schema = yup.object({
    reviewType: yup.mixed<ReviewType>().oneOf(Object.values(ReviewType)).required('Review type is required').default(ReviewType.ProjectReview),
    title: yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters long')
        .max(50, 'Title must be at most 50 characters long'),
    description: yup.string(),
    isPublic: yup.boolean().required('Public is required'),
}).required();

export interface CreateReviewFormProps {

}

const CreateReviewForm = ({

}: CreateReviewFormProps) => {
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
    } = useForm<IReviewFormInput>({
        resolver: yupResolver<IReviewFormInput>(schema)
    });

    const reviewType = watch("reviewType");
    
    const { currentUser } = useCurrentUser();
    
    const handleSelectedUsersChange = (users: UserSmall[]) => {
        setSelectedUserIds(users.map((u) => u.id));
    }

    const handleSelectedProjectChange = (project?: ProjectSmall) => {
        setSelectedProjectId(project?.id);
    }

    const onSubmit: SubmitHandler<IReviewFormInput> = async data => {
        if (!validateInput(data)) {
            return;
        }

        const createReviewDTO = getCreateReviewDTO(data);
        console.log("Create Review DTO: ", createReviewDTO);

        const createdReview = await createReview(createReviewDTO);

        addToast({
            title: "Review Created",
            message: "Review has been created successfully",
            outcome: OperationOutcome.SUCCESS
        });

        const reviewUrl = "http://localhost:3000" + constructFeatureURL(Feature.Review, createdReview?.data?.id.toString());
        router.push(reviewUrl);
    }

    const validateInput = (data: IReviewFormInput): boolean => {
        const isValid = !!data && selectedUserIds?.find(u => u === currentUser?.id) !== undefined;
        return isValid;
    }

    const getCreateReviewDTO = (data: IReviewFormInput) => {
        const reviewDTO: CreateReviewDTO = {
            reviewType: data.reviewType,
            projectId: selectedProjectId,
            title: data.title,
            description: data.description,
            isPublic: data?.isPublic ?? false,
            userIds: selectedUserIds,
            collaborationIds: [],
        };

        return reviewDTO;
    }

    return (
        <div className="px-16 py-4">
            <h1 className="page-title py-6 text-center w-full">Create Review</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                {/* Review Type, Project and Is Public */}
                <div className="flex items-start flex-wrap lg:flex-nowrap lg:space-x-8">
                    <FormSelectField
                        formItem={reviewFormItemsConfig.selectItems?.["reviewType"] ?? undefined}
                        register={register}
                        error={errors?.reviewType?.message}
                    />  

                    {reviewType === 'ProjectReview' && (
                        <FormProjectSelection
                            label="Project"
                            id="project"
                            currentUser={currentUser ?? undefined}
                            onSelectedProjectChange={handleSelectedProjectChange}
                        />
                    )}

                    <FormSwitchField
                        formItem={reviewFormItemsConfig.switchItems?.["isPublic"] ?? undefined}
                        register={register}
                        error={errors?.isPublic?.message}
                    />
                </div>

                {/* Title, Description */}
                <FormTextField 
                    formItem={reviewFormItemsConfig.textItems?.["title"]}
                    register={register}
                    error={errors?.title?.message}
                />

                <FormTextField 
                    formItem={reviewFormItemsConfig.textItems?.["description"]}
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
                        Create Review
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateReviewForm;