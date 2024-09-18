"use client";

import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import UserWorksPage from "@/features/research/works/components/UserWorksPage";

export default function WorksPage() {
    
    const { currentUser } = useCurrentUser();

    return (
        <UserWorksPage userId={currentUser?.id} currentRoute={false} />
    )
}