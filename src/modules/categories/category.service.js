import ApiError from "../../utils/ApiError.js"

import { getAllCategories, getCategoryById, getCategoryByName, getCategoryBySlug, createCategory, updateCategory, deleteCategory } from "./category.repository.js"

export const getAllCategoriesService = async () => {
    return await getAllCategories();
}

export const getCategoryByIdService = async (id) => {
    const category = await getCategoryById(id);
    if(!category){
        throw new ApiError(404, "Category not found");
    }
    return category;
}


export const createCategoryService = async (data) => {
    const existingCategory = await getCategoryByName(data.name);
    if(existingCategory){
        throw new ApiError(409, "Category name already exists");
    }

    const existingSlug = await getCategoryBySlug(data.slug);
    if(existingSlug){
        throw new ApiError(409, "Category slug already exists");
    }

    if(data.parent_category_id){
        const parentCategory = await getCategoryById(data.parent_category_id);
        if (!parentCategory) {
            throw new ApiError(404, "Parent category not found");
        }
    }

    return await createCategory(data);
}




export const updateCategoryService = async (id, data) => {
    const category = await getCategoryById(id);
    if(!category){
        throw new ApiError(404, "Category not found");  
    }

    if (data.name && data.name !== category.name) {
        const existingCategory = await getCategoryByName(data.name);
        if (existingCategory) {
            throw new ApiError(409, "Category name already exists");
        }
    }

    if (data.slug && data.slug !== category.slug) {
        const existingSlug = await getCategoryBySlug(data.slug);
        if (existingSlug) {
            throw new ApiError(409, "Category slug already exists");
        }
    }

    if (data.parent_category_id) {
        const parentCategory = await getCategoryById(data.parent_category_id);
        if (!parentCategory) {
            throw new ApiError(404, "Parent category not found");
        }
    }

    return await updateCategory({
        id,
        name: data.name ?? category.name,
        slug: data.slug ?? category.slug,
        description: data.description ?? category.description,
        parent_category_id: data.parent_category_id ?? category.parent_category_id,
    });
}



export const deleteCategoryService = async (id) => {
    const category = await getCategoryById(id);
    if(!category){
        throw new ApiError(404, "Category not found")
    }
    return await deleteCategory(id);
}