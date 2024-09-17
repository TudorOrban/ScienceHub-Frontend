import UserProfileCommunityContent from "@/core/user/components/user-profile/UserProfileCommunityContent";
import UserProfileWrapper from "@/core/user/components/user-profile/UserProfileWrapper";

export default function UserCommunityPage({
    params: { identifier },
}: {
    params: { identifier: string; };
}) {
    const currentMenuItemValue = "community";
    
    return (
        <UserProfileWrapper currentMenuItemValue={currentMenuItemValue}>
            <UserProfileCommunityContent />
        </UserProfileWrapper>
    )
}