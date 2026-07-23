import asyncHandler from "../../middlewares/asyncHandler.js";

import { addReview, getProductReviews, editReview, removeReview } from "./review.service.js";



export const create = asyncHandler(async (req, res) => {
    const { productId, rating, comment } = req.body;
    const review = await addReview(req.user.userId, productId, rating, comment);
    res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: review,
    });
});


export const getByProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const reviews = await getProductReviews(productId);
    res.status(200).json({
        success: true,
        data: reviews,
    });
});


export const update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await editReview(id, req.user.userId, rating, comment);
    res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: review,
    });
});



export const remove = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await removeReview(id, req.user.userId);
    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
    });
});