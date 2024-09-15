import Image from "next/image";
import { UserSmall } from "../models/User";

export interface UserAvatarProps {
    userSmall?: UserSmall;
    size?: "small" | "medium" | "large";
    onClick?: () => void;
}

const UserAvatar = ({ 
    userSmall, 
    size = "medium",
    onClick 
}: UserAvatarProps) => {

    const getUserInitials = (fullName: string) => {
        if (!fullName) return "?";
        const names = fullName.split(" ");
        return names[0][0] + names[names.length - 1][0];
    }

    const getTailwindCSSBySize = () => {
        if (size === "small") return "w-8 h-8 text-sm";
        if (size === "medium") return "w-10 h-10 text-base";
        return "w-14 h-14 text-lg";
    }

    return (
        <button
            className={`user-avatar ${getTailwindCSSBySize()}`}
            onClick={() => (onClick && onClick())}
        >
            {userSmall?.avatarUrl ? (
                <Image src={userSmall.avatarUrl} alt="User Avatar" className="rounded-full w-10 h-10" />
            ) : (
                <p>{getUserInitials(userSmall?.fullName || "")}</p>
            )}
        </button>
    )
}

export default UserAvatar;