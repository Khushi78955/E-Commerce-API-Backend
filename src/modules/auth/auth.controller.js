import {register, login, refreshAccessToken, logout, logoutAllDevices, verifyEmail, forgotPassword, resetPassword, getCurrentUser} from "./auth.service.js";

import asyncHandler from "../../middlewares/asyncHandler.js";

export const registerController = asyncHandler(async (req, res) => {
    const result = await register(req.body);
    res.status(201).json(result);
});



export const loginController = asyncHandler(async (req, res) => {
    const result = await login({
        ...req.body,
        deviceName: req.headers["sec-ch-ua-platform"] || "Unknown Device",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
    });
    res.status(200).json(result);
});



export const refreshTokenController = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await refreshAccessToken({
        refreshToken,
        deviceName: req.headers["sec-ch-ua-platform"] || "Unknown Device",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
    });
    res.status(200).json(result);
});



export const logoutController = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await logout(refreshToken);
    res.status(200).json(result);
});



export const logoutAllDevicesController = asyncHandler(async (req, res) => {
    const result = await logoutAllDevices(req.user.userId);
    res.status(200).json(result);
});



export const verifyEmailController = asyncHandler(async (req, res) => {
    const { token } = req.query;
    const result = await verifyEmail(token);
    res.status(200).json(result);
});



export const forgotPasswordController = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await forgotPassword(email);
    res.status(200).json(result);
});

export const resetPasswordController = asyncHandler(async (req, res) => {
    const result = await resetPassword(req.body);
    res.status(200).json(result);
});

export const getCurrentUserController = asyncHandler(async (req, res) => {
    const result = await getCurrentUser(req.user.userId);
    res.status(200).json(result);
});