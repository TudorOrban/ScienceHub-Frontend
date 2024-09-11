import { Result } from "@/shared/http/Http";
import { PaginatedResults, SearchParams } from "@/shared/search/models/Search";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { ReviewSearchDTO, ReviewType } from "../models/Review";

export const searchReviewsByUserIdAndReviewType = async (userId: number, reviewType: ReviewType, searchParams: SearchParams): Promise<Result<PaginatedResults<ReviewSearchDTO>>> => {
    const request = apiClient.get<PaginatedResults<ReviewSearchDTO>>(
        `reviews/reviewType/${reviewType}/user/${userId}/search`, 
        { params: searchParams, }
    );
    return await handleAPIRequest<PaginatedResults<ReviewSearchDTO>>(request);
}