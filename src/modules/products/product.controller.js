import asyncHandler from "../../middlewares/asyncHandler.js";

import {getAllProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService} from "./product.service.js";

export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await getAllProductsService();
    res.status(200).json({
        success: true,
        data: products,
    });
});

export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    res.status(200).json({
        success: true,
        data: product,
    });
});

export const createProduct = asyncHandler(async (req, res) => {
    const product = await createProductService(req.body);
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
    });
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await updateProductService(id, req.body);
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
    });
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deleteProductService(id);
    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});