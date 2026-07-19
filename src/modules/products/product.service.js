import ApiError from "../../utils/ApiError.js";

import {getAllProducts, getProductById, getProductBySlug, getProductBySku, createProduct, updateProduct, deleteProduct} from "./product.repository.js";
import { getCategoryById } from "../categories/category.repository.js";


export const getAllProductsService = async () => {
    return await getAllProducts();
};


export const getProductByIdService = async (id) => {
    const product = await getProductById(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    return product;
};


export const createProductService = async (data) => {
    const category = await getCategoryById(data.category_id);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    const existingSlug = await getProductBySlug(data.slug);
    if (existingSlug) {
        throw new ApiError(409, "Product slug already exists");
    }

    const existingSku = await getProductBySku(data.sku);
    if (existingSku) {
        throw new ApiError(409, "Product SKU already exists");
    }
    if (data.discount_price !== undefined && data.discount_price !== null && data.discount_price > data.price) {
        throw new ApiError(400, "Discount price cannot be greater than price");
    }

    return await createProduct(data);
};

export const updateProductService = async (id, data) => {
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
        throw new ApiError(404, "Product not found");
    }

    const categoryId = data.category_id ?? existingProduct.category_id;
    const category = await getCategoryById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    const slug = data.slug ?? existingProduct.slug;
    const slugProduct = await getProductBySlug(slug);
    if (slugProduct && slugProduct.id !== Number(id)) {
        throw new ApiError(409, "Product slug already exists");
    }

    const sku = data.sku ?? existingProduct.sku;
    const skuProduct = await getProductBySku(sku);
    if (skuProduct && skuProduct.id !== Number(id)) {
        throw new ApiError(409, "Product SKU already exists");
    }

    const price = data.price ?? existingProduct.price;
    const discountPrice = data.discount_price !== undefined ? data.discount_price : existingProduct.discount_price;
    if (discountPrice !== null && discountPrice > price) {
        throw new ApiError(400, "Discount price cannot be greater than price");
    }

    return await updateProduct({
        id,
        category_id: categoryId,
        name: data.name ?? existingProduct.name,
        slug,
        description:
            data.description ?? existingProduct.description,
        sku,
        price,
        discount_price: discountPrice,
        is_active:
            data.is_active ?? existingProduct.is_active,
    });
};

export const deleteProductService = async (id) => {
    const product = await getProductById(id);
    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    await deleteProduct(id);
};