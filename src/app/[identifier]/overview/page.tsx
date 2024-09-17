import UserProfileOverviewContent from "@/core/user/components/user-profile/UserProfileOverviewContent";
import UserProfileWrapper from "@/core/user/components/user-profile/UserProfileWrapper";

export default function UserProfilePage({
    params: { identifier },
}: {
    params: { identifier: string; };
}) {
    const currentMenuItemValue = "overview";
    
    return (
        <UserProfileWrapper currentMenuItemValue={currentMenuItemValue}>
            <UserProfileOverviewContent />
        </UserProfileWrapper>
    )
}