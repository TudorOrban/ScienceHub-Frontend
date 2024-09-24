import { Result } from "@/shared/http/Http";
import apiClient from "@/shared/http/ApiClient";
import { handleAPIRequest } from "@/shared/http/handleAPIRequest";
import { CreateReviewDTO, ReviewDetailsDTO } from "../models/Review";

export const createReview = async (reviewDTO: CreateReviewDTO): Promise<Result<ReviewDetailsDTO>> => {
    const request = apiClient.post<ReviewDetailsDTO>(`reviews`, reviewDTO);
    return await handleAPIRequest<ReviewDetailsDTO>(request);
}