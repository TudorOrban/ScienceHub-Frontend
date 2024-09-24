import { FormConfig } from "@/shared/forms/models/Form";
import { IIssueFormInput } from "../components/CreateIssueForm";

export const issueFormItemsConfig: FormConfig<IIssueFormInput> = {
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
        "issueType": {
            label: "Issue Type",
            id: "issueType",
            items: [
                { label: "Project Issue", value: "ProjectIssue" },
                { label: "Work Issue", value: "WorkIssue" },
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