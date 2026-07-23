import {getDashboard, listUsers, getUser, changeUserStatus} from "./admin.service.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";


export const getDashboardController = asyncHandler(async (req, res) => {
    const stats = await getDashboard();
    return res.status(200).json(
        new ApiResponse(200, stats, "Dashboard statistics fetched successfully")
    )
})


export const listUsersController = asyncHandler(async (req, res) => {
    const users = await listUsers();
    return res.status(200).json(
        new ApiResponse(200, users, "Users fetched successfully")
    )
})


export const getUserController = asyncHandler(async (req, res) => {
    const user = await getUser(req.params.id);
    return res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    );
})


export const changeUserStatusController = asyncHandler(async (req, res) => {
    const { isActive } = req.body;
    const user = await changeUserStatus(req.params.id, isActive);
    return res.status(200).json(
        new ApiResponse(200, user, "User status updated successfully")
    )
})