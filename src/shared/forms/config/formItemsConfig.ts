import { FormConfig } from "../models/Form";
import { IWorkFormInput } from "@/features/research/works/components/CreateWorkForm";


export const workFormItemsConfig: FormConfig<IWorkFormInput> = {
    textItems: {
        "title": {
            label: "Title",
            id: "title",
            type: "text",
            options: {
                required: "Title is required"
            }
        },
        "name": {
            label: "Name",
            id: "name",
            type: "text",
            options: {
                required: "Name is required"
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
        "workType": {
            label: "Work Type",
            id: "workType",
            items: [
                { label: "Paper", value: "Paper" },
                { label: "Experiment", value: "Experiment" },
                { label: "Dataset", value: "Dataset" },
                { label: "Data Analysis", value: "DataAnalysis" },
                { label: "AI Model", value: "AIModel" },
                { label: "Code Block", value: "CodeBlock" },
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