import UserProfileManagementContent from "@/core/user/components/user-profile/UserProfileManagementContent";
import UserProfileWrapper from "@/core/user/components/user-profile/UserProfileWrapper";

export default function UserManagementPage({
    params: { identifier },
}: {
    params: { identifier: string; };
}) {
    const currentMenuItemValue = "management";
    
    return (
        <UserProfileWrapper currentMenuItemValue={currentMenuItemValue}>
            <UserProfileManagementContent />
        </UserProfileWrapper>
    )
}