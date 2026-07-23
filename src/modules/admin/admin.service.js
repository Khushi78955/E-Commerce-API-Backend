import { getDashboardStats, getAllUsers, getUserById, updateUserStatus } from "./admin.repository.js";
import ApiError from "../../utils/ApiError.js";

export const getDashboard = async () => {
    return await getDashboardStats();
}


export const listUsers = async () => {
    return await getAllUsers();
}


export const getUser = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }
    return user;
}


export const changeUserStatus = async (userId, isActive) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }
    const updatedUser = await updateUserStatus(userId, isActive);
    return updatedUser;
}