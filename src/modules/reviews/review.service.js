import ApiError from "../../utils/ApiError.js";
import { createReview, getReviewByUserAndProduct, getReviewById, getReviewsByProduct, updateReview, deleteReview } from "./review.repository.js";
import { getProductById } from "../products/product.repository.js";


export const addReview = async (userId, productId, rating, comment) => {
    const product = await getProductById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const existingReview = await getReviewByUserAndProduct(userId, productId);
    if(existingReview){
        throw new ApiError(400, "You have already reviewed this product");
    }

    return await createReview(userId, productId, rating, comment);
}



export const getProductReviews = async (productId) => {
    const product = await getProductById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return await getReviewsByProduct(productId);
}



export const editReview = async (reviewId, userId, rating, comment) => {
    const review = await getReviewById(reviewId);
    if (!review) {
        throw new ApiError(404, "Review not found");
    }
    if (review.user_id !== userId) {
        throw new ApiError(403, "You are not authorized to update this review");
    }

    return await updateReview(reviewId, rating, comment);
}



export const removeReview = async (reviewId, userId) => {
    const review = await getReviewById(reviewId);
    if (!review) {
        throw new ApiError(404, "Review not found");
    }
    if (review.user_id !== userId) {
        throw new ApiError(403, "You are not authorized to delete this review");
    }
    await deleteReview(reviewId);
};