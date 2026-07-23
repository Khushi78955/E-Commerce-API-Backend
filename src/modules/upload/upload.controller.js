import asyncHandler from "../../middlewares/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {uploadProductImage, uploadUserProfileImage} from "./upload.service.js";

export const uploadProfileImage = asyncHandler(async (req, res) => {
    console.log("FILE:", req.file);
    console.log("USER:", req.user);
    const user = await uploadUserProfileImage(req.user.userId, req.file);
    return res.status(200).json(
        new ApiResponse(200, user, "Profile image uploaded successfully.")
    )
})



export const uploadProductImageController = asyncHandler(async (req, res) => {
    const product = await uploadProductImage(req.params.productId, req.file);
    return res.status(200).json(
        new ApiResponse(200, product, "Product image uploaded successfully.")
    )
})