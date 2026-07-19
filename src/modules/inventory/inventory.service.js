import ApiError from "../../utils/ApiError.js";

import { getProductById } from "../products/product.repository.js";
import { getInventoryByProductId, createInventory, updateInventory } from "./inventory.repository.js";


export const getInventoryByProductIdService = async (productId) => {
    const product = await getProductById(productId);
    if(!product){
        throw new ApiError(404, "Product not found");
    }

    const inventory = await getInventoryByProductId(productId);
    if (!inventory) {
        throw new ApiError(404, "Inventory not found");
    }

    return inventory;
}


export const createInventoryService = async (productId, quantity) => {
    const product = await getProductById(productId);
    if(!product){
        throw new ApiError(404, "Product not found");
    }

    const existingInventory = await getInventoryByProductId(productId);
    if(existingInventory){
        throw new ApiError(409, "Inventory already exists");
    }

    return await createInventory(productId, quantity);
}


export const updateInventoryService = async (productId, quantity) => {
    const inventory = await getInventoryByProductId(productId)
    if(!inventory){
        throw new ApiError(404, "Inventory not found")
    }
    return await updateInventory(productId, quantity);
}