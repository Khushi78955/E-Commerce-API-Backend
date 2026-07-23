import { getProfile, updateProfile, changePassword, deleteAccount } from "./user.service.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";


export const getProfileController = asyncHandler(async (req, res) => {
    const user = await getProfile(req.user.userId)
    return res.status(200).json(
        new ApiResponse(200, user, "Profile fetched successfully")
    )
})


export const updateProfileController = asyncHandler(async (req, res) => {
    const updatedUser = await updateProfile(req.user.userId, req.body);
    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Profile updated successfully")
    );
});


export const changePasswordController = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    await changePassword(req.user.userId, currentPassword, newPassword);
    return res.status(200).json(
        new ApiResponse(200, null, "Password changed successfully. Please log in again")
    );
});


export const deleteAccountController = asyncHandler(async (req, res) => {
    await deleteAccount(req.user.userId);
    return res.status(200).json(
        new ApiResponse(200, null, "Account deleted successfully")
    );
});