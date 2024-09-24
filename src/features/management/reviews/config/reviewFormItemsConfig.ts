import { FormConfig } from "@/shared/forms/models/Form";
import { IReviewFormInput } from "../components/CreateReviewForm";

export const reviewFormItemsConfig: FormConfig<IReviewFormInput> = {
    textItems: {
        "title": {
            label: "Title",
            id: "title",
            type: "text",
            options: {
                required: "Title is required"
            }
        },
        "description": {
            label: "Description",
            id: "description",
            type: "textarea",
            options: {
                minLength: { value: 10, message: "Description must be at least 10 characters long" }
            }
        },
    },
    selectItems: {
        "reviewType": {
            label: "Review Type",
            id: "reviewType",
            items: [
                { label: "Project Review", value: "ProjectReview" },
                { label: "Work Review", value: "WorkReview" },
            ],
        }
    },
    switchItems: {
        "isPublic": {
            label: "Public",
            id: "isPublic",
            options: {
                required: "Is Public is required"
            },
            error: "Is Public is required"
        }
    }
}