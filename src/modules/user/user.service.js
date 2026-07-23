import bcrypt from "bcrypt";

import { getUserProfile, getUserById, updateUserProfile, updatePassword, softDeleteUser, revokeAllRefreshTokens } from "./user.repository.js";

import ApiError from "../../utils/ApiError.js";


export const getProfile = async (userId) => {
    const user = await getUserProfile(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return user;
}


export const updateProfile = async (userId, data) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const updatedUser = await updateUserProfile(userId, {
        first_name: data.first_name,
        last_name: data.last_name,
        profile_image_url: data.profile_image_url ?? user.profile_image_url
    });
    return updatedUser;
};


export const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (!user.password_hash) {
        throw new ApiError(400, "Password change is unavailable for OAuth accounts")
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash)
    if (!isPasswordValid) {
        throw new ApiError(400, "Current password is incorrect.");
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await updatePassword(userId, passwordHash);
    await revokeAllRefreshTokens(userId);
    return;
}



export const deleteAccount = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    await revokeAllRefreshTokens(userId);
    await softDeleteUser(userId);
    return;
}