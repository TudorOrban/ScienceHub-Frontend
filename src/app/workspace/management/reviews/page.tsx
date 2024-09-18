"use client";

import { useCurrentUser } from "@/core/user/contexts/CurrentUserContext";
import UserReviewsPage from "@/features/management/reviews/components/UserReviewsPage";


export default function ReviewsPage() {
    const { currentUser } = useCurrentUser();

    return (
        <UserReviewsPage userId={currentUser?.id} currentRoute={false} />
    );
};