import { faBookmark, faCircleInfo, faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { UserSmall } from "../models/User";
import UserAvatar from "./UserAvatar";

export interface UserbarProps {
    userSmall?: UserSmall;
    setIsUserbarOpen?: (isOpen: boolean) => void;
}

const Userbar = ({ 
    userSmall,
    setIsUserbarOpen
}: UserbarProps) => {
    const navigationOptions = [
        {
            label: "Profile",
            link: `/${userSmall?.username || ""}/profile`,
            icon: faUser,
        },
        {
            label: "Bookmarks",
            link: `/workspace/community/bookmarks`,
            icon: faBookmark,
        },
        {
            label: "Settings",
            link: `/${userSmall?.username || ""}/settings`,
            icon: faGear,
        },
        {
            label: "Help & Support",
            link: `/resources/help-support`,
            icon: faCircleInfo,
        },
    ];

    return (
        <div className="w-48 p-4 bg-white text-black border border-gray-300 rounded-md shadow-sm z-50">
            <div className="flex items-center space-x-2">
                <UserAvatar userSmall={userSmall} />

                <div className="font-semibold">{userSmall?.username}</div>
            </div>

            <div className="space-y-4 py-4">
                {navigationOptions.map((option, index) => (
                    <div key={option.label}>
                        <Link href={option.link} className="flex items-center text-gray-800 hover:font-semibold hover:text-gray-900">
                            <FontAwesomeIcon
                                icon={option.icon}
                                className="small-icon mr-2"
                            />
                            {option.label}
                        </Link>
                    </div>
                ))}
            </div>
            
            <button
                // onClick={handleLogout}
                className="auth-button"
            >
                Logout
            </button>
        </div>
    )
}

export default Userbar;