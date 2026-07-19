import asyncHandler from "../../middlewares/asyncHandler.js";

import { getWishlistItemsService, addToWishlistService, removeWishlistItemService } from "./wishlist.service.js";

export const getWishlistItems = asyncHandler(async(req, res) => {
    const wishlist = await getWishlistItemsService(req.user.userId);
    res.status(200).json({
        success: true,
        data: wishlist
    })
})


export const addToWishlist = asyncHandler(async (req, res) => {
    const {product_id} = req.body;
    const wishlistItem = await addToWishlistService(req.user.userId, product_id);
    res.status(200).json({
        success: true,
        data: wishlistItem
    })
})


export const removeWishlistItem = asyncHandler(async (req, res) => {
    const {productId} = req.params;
    await removeWishlistItemService(req.user.userId, productId);
    res.status(200).json({
        success: true,
        message: "Wishlist item removed successfully",
    })
})