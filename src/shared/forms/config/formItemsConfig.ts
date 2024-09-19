import { WorkType } from "@/features/research/works/models/Work";
import { FormConfig } from "../models/Form";
import { IWorkFormInput } from "@/features/research/works/components/CreateWorkForm";


export const workFormItemsConfig: FormConfig<IWorkFormInput, IWorkFormInput> = {
    textItems: [
        {
            label: "Title",
            id: "title",
            type: "text",
            options: {
                required: "Title is required"
            }
        },
        {
            label: "Name",
            id: "name",
            type: "text",
            options: {
                required: "Name is required"
            }
        },
        {
            label: "Description",
            id: "description",
            type: "textarea",
            options: {
                minLength: { value: 10, message: "Description must be at least 10 characters long" }
            }
        },
    ],
    selectItems: [
        {
            label: "Work Type",
            id: "workType",
            items: [
                {
                    label: "Paper", value: "Paper"
                },
                {
                    label: "Dataset", value: "Dataset"
                },
                {
                    label: "Experiment", value: "Experiment"
                },
                {
                    label: "Data Analysis", value: "DataAnalysis"
                },
                {
                    label: "AI Model", value: "AIModel"
                },
                {
                    label: "Code Block", value: "CodeBlock"
                },
            ],
        }
    ]
}