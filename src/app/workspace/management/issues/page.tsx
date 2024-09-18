"use client";

import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import UserIssuesPage from "@/features/management/issues/components/UserIssuesPage";

export default function IssuesPage() {
    const { currentUser } = useCurrentUser();

    return (
        <UserIssuesPage userId={currentUser?.id} currentRoute={false} />
    )
}