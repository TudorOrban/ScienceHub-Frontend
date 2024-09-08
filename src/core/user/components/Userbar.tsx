import { UserSmall } from "../models/User";

export interface UserbarProps {
    user: UserSmall;
    setIsUserbarOpen?: (isOpen: boolean) => void;
}

const Userbar = ({ 
    user,
    setIsUserbarOpen
}: UserbarProps) => {

    return (
        <div className="w-32 h-80 bg-white border border-gray-300 rounded-md shadow-sm">
            <div className="flex items-center justify-between w-full">
                <span>Userbar</span>

                <button
                    className="text-gray-500"
                    onClick={() => (setIsUserbarOpen && setIsUserbarOpen(false))}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default Userbar;