import ApiError from "../../utils/ApiError.js";
import cloudinary from "../../config/cloudinary.js";

import {updateProductImage, updateUserProfileImage} from "./upload.repository.js";


const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        console.log("Starting Cloudinary upload...");

        console.log("FILE BUFFER SIZE:", file.buffer.length);
        const stream = cloudinary.uploader.upload_stream({
                folder: "ecommerce-api",
                resource_type: "auto",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(file.buffer);
    });
};


export const uploadUserProfileImage = async (userId, file) => {
    if (!file) {
        throw new ApiError(400, "Image is required.");
    }
    const result = await uploadToCloudinary(file);
    const user = await updateUserProfileImage(userId, result.secure_url);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }
    return user;
};



export const uploadProductImage = async (productId, file) => {
    if (!file) {
        throw new ApiError(400, "Image is required.");
    }
    const result = await uploadToCloudinary(file);
    const product = await updateProductImage(productId, result.secure_url);
    if (!product) {
        throw new ApiError(404, "Product not found.");
    }
    return product;
};