import ApiError from "../../utils/ApiError.js";

import { getProductById } from "../products/product.repository.js";

import {getWishlistItemsByUserId, getWishlistItem, addToWishlist, removeWishlistItem} from "./wishlist.repository.js";


export const getWishlistItemsService = async (userId) => {
    return await getWishlistItemsByUserId(userId);
}

export const addToWishlistService = async (userId, productId) => {
    const product = await getProductById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    if (!product.is_active) {
        throw new ApiError(400, "Product is inactive");
    }

    const existingItem = await getWishlistItem(userId, productId);
    if (existingItem) {
        throw new ApiError(400, "Product already exists in wishlist");
    }

    return await addToWishlist(userId, productId);
};



export const removeWishlistItemService = async (userId, productId) => {
    const wishlistItem = await getWishlistItem(userId, productId);
    if (!wishlistItem) {
        throw new ApiError(404, "Wishlist item not found");
    }
    await removeWishlistItem(userId, productId);
};