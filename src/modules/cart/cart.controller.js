import asyncHandler from "../../middlewares/asyncHandler.js";

import { getCartItemsService, addToCartService, updateCartItemService, removeCartItemService, clearCartService } from "./cart.service.js";

export const getCartItems = asyncHandler(async (req, res) => {
    const cart = await getCartItemsService(req.user.userId);
    res.status(200).json({
        success: true,
        data: cart,
    });
});

export const addToCart = asyncHandler(async (req, res) => {
    const { product_id, quantity } = req.body;
    const cartItem = await addToCartService(req.user.userId, product_id, quantity);
    res.status(201).json({
        success: true,
        data: cartItem,
    });
});

export const updateCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cartItem = await updateCartItemService(req.user.userId, productId, quantity);
    res.status(200).json({
        success: true,
        data: cartItem,
    });
});

export const removeCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    await removeCartItemService(req.user.userId, productId);
    res.status(200).json({
        success: true,
        message: "Cart item removed successfully.",
    });
});

export const clearCart = asyncHandler(async (req, res) => {
    await clearCartService(req.user.userId);
    res.status(200).json({
        success: true,
        message: "Cart cleared successfully.",
    });
});