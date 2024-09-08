import { UserSmall } from "../models/User";

export interface UserAvatarProps {
    userSmall: UserSmall;
    onClick?: () => void;
}

const UserAvatar = (
    { userSmall, onClick }: UserAvatarProps
) => {

    const getUserInitials = (fullName: string) => {
        if (!fullName) return "";
        const names = fullName.split(" ");
        return names[0][0] + names[names.length - 1][0];
    }

    return (
        <button
            className="user-avatar"
            onClick={() => (onClick && onClick())}
        >
            <p>{getUserInitials(userSmall?.fullName || "")}</p>
        </button>
    )
}

export default UserAvatar;