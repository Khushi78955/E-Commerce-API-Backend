import crypto from "crypto";
import jwt from "jsonwebtoken";

import env from "../../config/env.js";

import ApiError from "../../utils/ApiError.js";
import hashPassword from "../../utils/hashPassword.js";
import comparePassword from "../../utils/comparePassword.js";
import hashToken from "../../utils/hashToken.js";
import generateTokens from "../../utils/generateTokens.js";

import sendVerificationEmail from "../../mail/sendVerificationEmail.js";
import sendResetPasswordEmail from "../../mail/sendResetPasswordEmail.js";

import { findUserByEmail, findUserById, createUser, findRoleByName, assignRoleToUser, getUserRoles, createRefreshToken, findRefreshToken, revokeRefreshToken, revokeAllRefreshTokens, createUserSession, deleteUserSession, createLoginAttempt, createEmailVerificationToken, findEmailVerificationToken, markEmailVerificationTokenAsUsed, verifyUserEmail, createPasswordResetToken, findPasswordResetToken, markPasswordResetTokenAsUsed, updateUserPassword, findOAuthAccount, createOAuthAccount, updateLastLogin } from "./auth.repository.js";


const generateRandomToken = () => {
    return crypto.randomBytes(32).toString("hex");
}

const getRoleNames = (roles) => {
    return roles.map((role) => role.name);
}


export const register = async ({firstName, lastName, email, password}) => {
    const existingUser = await findUserByEmail(email);
    if(existingUser){
        throw new ApiError(409, "Email already registered");
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({firstName, lastName, email, passwordHash})
    
    const customerRole = await findRoleByName("customer");
    if(!customerRole){
        throw new ApiError(500, "Customer role not found");
    }

    await assignRoleToUser(user.id, customerRole.id);
    const verificationToken = generateRandomToken();
    const verificationTokenHash = hashToken(verificationToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await createEmailVerificationToken({
        userId: user.id,
        tokenHash: verificationTokenHash,
        expiresAt,
    });

    await sendVerificationEmail({
        email: user.email,
        firstName: user.first_name,
        token: verificationToken,
    });

    return {
        message: "Registration successful. Please verify your email", user
    }
}





export const login = async ({email, password, deviceName, ipAddress, userAgent}) => {
    const user = await findUserByEmail(email);
    if(!user){
        await createLoginAttempt({email, ipAddress, userAgent, successful: false})
        throw new ApiError(401, "Invalid email or password");
    }
    if(!user.is_active){
        throw new ApiError(403, "Your account has been disabled");
    }

    const passwordMatched = await comparePassword(password, user.password_hash)
    if(!passwordMatched){
        await createLoginAttempt({email, ipAddress, userAgent, successful: false})
        throw new ApiError(401, "Invalid email or password");
    }

    const roles = await getUserRoles(user.id);
    const {accessToken, refreshToken, jti} = generateTokens({
        userId: user.id,
        email: user.email,
        roles: getRoleNames(roles)
    })

    const refreshTokenHash = hashToken(refreshToken);
    const refreshTokenExpiry = jwt.decode(refreshToken).exp * 1000;

    const refreshTokenRecord = await createRefreshToken({
        userId: user.id,
        jti,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(refreshTokenExpiry),
    });

    await createUserSession({
        userId: user.id,
        refreshTokenId: refreshTokenRecord.id,
        deviceName,
        ipAddress,
        userAgent});
    await updateLastLogin(user.id);
    await createLoginAttempt({email, ipAddress, userAgent, successful: true});

    return {
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            profileImage: user.profile_image_url,
            roles: getRoleNames(roles),
        }
    }
}




export const refreshAccessToken = async ({refreshToken, deviceName, ipAddress, userAgent}) => {
    let payload;
    try{
        payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    } catch {
        throw new ApiError(401, "Invalid refresh token");
    }

    const refreshTokenHash = hashToken(refreshToken);
    const storedToken = await findRefreshToken(refreshTokenHash);
    if (!storedToken) {
        throw new ApiError(401, "Refresh token is invalid or expired");
    }
    await revokeRefreshToken(storedToken.id);
    await deleteUserSession(storedToken.id);
    const roles = await getUserRoles(storedToken.user_id);
    const {accessToken, refreshToken: newRefreshToken, jti} = generateTokens({
        userId: storedToken.user_id,
        email: storedToken.email,
        roles: getRoleNames(roles)
    })
    const newRefreshTokenExpiry = jwt.decode(newRefreshToken).exp * 1000;
    const newRefreshTokenHash = hashToken(newRefreshToken);
    const refreshTokenRecord = await createRefreshToken({
        userId: storedToken.user_id,
        jti,
        tokenHash: newRefreshTokenHash,
        expiresAt: new Date(newRefreshTokenExpiry),
    });

    await createUserSession({
        userId: storedToken.user_id,
        refreshTokenId: refreshTokenRecord.id,
        deviceName,
        ipAddress,
        userAgent
    });

    return {
        accessToken,
        refreshToken: newRefreshToken,
    };
}



export const logout = async (refreshToken) => {
    let payload;
    try{
        payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    } catch {
        throw new ApiError(401, "Invalid refresh token");
    }
    const refreshTokenHash = hashToken(refreshToken);
    const storedToken = await findRefreshToken(refreshTokenHash);
    if(!storedToken){
        return {
            message: "Already logged out"
        }
    }

    await revokeRefreshToken(storedToken.id);
    await deleteUserSession(storedToken.id);
    return {
        message: "Logged out successfully"
    }
}



export const logoutAllDevices = async (userId) => {
    const user = await findUserById(userId);
    if(!user){
        throw new ApiError(404, "User not found");
    }
    await revokeAllRefreshTokens(userId);
    return {
        message: "Logged out from all devices successfully.",
    };
}



export const verifyEmail = async (token) => {
    const tokenHash = hashToken(token);
    const verificationToken = await findEmailVerificationToken(tokenHash);
    if(!verificationToken){
        throw new ApiError(400, "Verification token is invalid or expired")
    }

    await verifyUserEmail(verificationToken.user_id);
    await markEmailVerificationTokenAsUsed(verificationToken.id);
    return {
        message: "Email verified successfully"
    }
}


export const forgotPassword = async (email) => {
    const user = await findUserByEmail(email);
    if(!user){
        return {
            message: "If an account exists with this email, a password reset link has been sent"
        }
    }

    const resetToken = generateRandomToken();
    const resetTokenHash = hashToken(resetToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30);
    await createPasswordResetToken({
        userId: user.id,
        tokenHash: resetTokenHash,
        expiresAt
    })

    await sendResetPasswordEmail({
        email: user.email,
        firstName: user.first_name,
        token: resetToken
    })

    return {
        message: "If an account exists with this email, a password reset link has been sent"
    }
}



export const resetPassword = async ({token, password}) => {
    const tokenHash = hashToken(token);
    const resetToken = await findPasswordResetToken(tokenHash);
    if(!resetToken){
        throw new ApiError(400, "Reset token is invalid or expired");
    }

    const passwordHash = await hashPassword(password);
    await updateUserPassword(resetToken.user_id, passwordHash);
    await markPasswordResetTokenAsUsed(resetToken.id);
    await revokeAllRefreshTokens(resetToken.user_id);
    return {
        message:
        "Password reset successful. Please login again.",
    };
}




export const getCurrentUser = async (userId) => {
    const user = await findUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    
    const roles = await getUserRoles(user.id);
    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        profileImage: user.profile_image_url,
        isEmailVerified: user.is_email_verified,
        isActive: user.is_active,
        roles: getRoleNames(roles),
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        lastLoginAt: user.last_login_at,
    };
};