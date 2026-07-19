import ApiError from "../../utils/ApiError.js";

import { getProductById } from "../products/product.repository.js";
import { getInventoryByProductId } from "../inventory/inventory.repository.js";

import { getCartItemsByUserId, getCartItem, addToCart, updateCartItem, removeCartItem, clearCart } from "./cart.repository.js";



export const getCartItemsService = async (userId) => {
    return await getCartItemsByUserId(userId);
}


export const addToCartService = async (userId, productId, quantity) => {
    const product = await getProductById(productId);
    if(!product){
        throw new ApiError(404, "Product not found");
    }
    if(!product.is_active){
        throw new ApiError(400, "Product is inactive");
    }

    const inventory = await getInventoryByProductId(productId);
    if(!inventory){
        throw new ApiError(404, "Inventory not found");
    }
    if(quantity > inventory.quantity - inventory.reserved_quantity){
        throw new ApiError(400, "Insufficient stock");
    }

    const existingItem = await getCartItem(userId, productId);
    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > inventory.quantity - inventory.reserved_quantity) {
            throw new ApiError(400, "Insufficient stock");
        }
        return await updateCartItem(userId, productId, newQuantity);
    }

    return await addToCart(userId, productId, quantity);
}



export const updateCartItemService = async (userId, productId, quantity) => {
    const cartItem = await getCartItem(userId, productId);
    if (!cartItem) {
        throw new ApiError(404, "Cart item not found.");
    }
    const inventory = await getInventoryByProductId(productId);
    if (!inventory) {
        throw new ApiError(404, "Inventory not found.");
    }
    if (quantity > inventory.quantity - inventory.reserved_quantity) {
        throw new ApiError(400, "Insufficient stock.");
    }
    return await updateCartItem(userId, productId, quantity);

};

export const removeCartItemService = async (userId, productId) => {
    const cartItem = await getCartItem(userId, productId);
    if (!cartItem) {
       throw new ApiError(404, "Cart item not found.");
    }
    await removeCartItem(userId, productId);
};

export const clearCartService = async (userId) => {
    await clearCart(userId);
};