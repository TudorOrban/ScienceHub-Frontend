"use client";

import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import UserProjectsPage from "@/features/research/projects/components/UserProjectsPage";

export default function ProjectsPage() {
    
    const { currentUser } = useCurrentUser();

    return (
        <UserProjectsPage userId={currentUser?.id} currentRoute={false} />
    )
}