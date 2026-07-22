import asyncHandler from "../../../middlewares/asyncHandler.js";
import { loginWithOAuth } from "./oauth.service.js";

export const oauthSuccess = asyncHandler(async (req, res) => {
    const {accessToken, refreshToken,} = await loginWithOAuth({
        profile: req.user.profile,
        deviceName: req.headers["x-device-name"] || "Unknown Device",
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken,
    });
});