import { FormItem } from "../models/Form";
import { IFormInput } from "@/features/research/works/components/CreateWorkForm";

export const workFormItemsConfig: FormItem<IFormInput>[] = [
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
];