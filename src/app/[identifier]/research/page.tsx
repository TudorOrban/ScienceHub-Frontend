import UserProfileResearchContent from "@/core/user/components/user-profile/UserProfileResearchContent";
import UserProfileWrapper from "@/core/user/components/user-profile/UserProfileWrapper";

export default function UserResearchPage({
    params: { identifier },
}: {
    params: { identifier: string; };
}) {
    const currentMenuItemValue = "research";
    
    return (
        <UserProfileWrapper currentMenuItemValue={currentMenuItemValue}>
            <UserProfileResearchContent />
        </UserProfileWrapper>
    )
}