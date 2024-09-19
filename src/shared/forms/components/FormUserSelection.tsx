import { UserSmall } from "@/core/user/models/User";

export interface FormUserSelectionProps {
    label: string;
    id: string;
    initialUsers?: UserSmall[];
}

const FormUserSelection = ({ 
    label, 
    id, 
    initialUsers 
}: FormUserSelectionProps) => {
    

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type="text"
                id={id}
                name={id}
                className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                placeholder="Search for users"
            />
        </div>
    );
};

export default FormUserSelection;

