import asyncHandler from "../../utils/asyncHandler.js";

import { getAllCategoriesService, getCategoryByIdService, createCategoryService, updateCategoryService, deleteCategoryService } from "./category.service.js";

export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await getAllCategoriesService();
    res.status(200).json({
        success: true,
        data: categories
    })
})


export const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await getCategoryByIdService(id);
    res.status(200).json({
        success: true,
        data: category,
    });
});

export const createCategory = asyncHandler(async (req, res) => {
    const category = await createCategoryService(req.body);
    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
    });
});

export const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await updateCategoryService(id, req.body);
    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category,
    });
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deleteCategoryService(id);
    res.status(200).json({
        success: true,
        message: "Category deleted successfully",
    });
});