import asyncHandler from "../../utils/asyncHandler.js";

import {getInventoryByProductIdService, createInventoryService, updateInventoryService} from "./inventory.service.js";

export const getInventoryByProductId = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const inventory = await getInventoryByProductIdService(productId);
    res.status(200).json({
        success: true,
        data: inventory,
    });
});

export const createInventory = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const inventory = await createInventoryService(productId, quantity);
    res.status(201).json({
        success: true,
        message: "Inventory created successfully",
        data: inventory,
    });
});

export const updateInventory = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const inventory = await updateInventoryService(productId, quantity);
    res.status(200).json({
        success: true,
        message: "Inventory updated successfully",
        data: inventory,
    });
});