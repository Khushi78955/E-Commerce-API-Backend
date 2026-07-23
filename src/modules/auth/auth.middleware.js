import jwt from "jsonwebtoken";

import env from "../../config/env.js";
import ApiError from "../../utils/ApiError.js";

import {findUserById, getUserRoles} from "./auth.repository.js";

export const protect = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return next(new ApiError(401, "Authentication required"));
    }
    const token = authorization.split(" ")[1];

    try {
        const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
        const user = await findUserById(payload.userId);
        if (!user) {
            return next(new ApiError(401, "User not found"));
        }
        if (!user.is_active) {
            return next(new ApiError(403, "Account has been disabled"));
        }

        const roles = await getUserRoles(user.id);

        req.user = {
            userId: user.id,
            email: user.email,
            roles: roles.map((role) => role.name),
        };

        next();
    } catch {
        next(new ApiError(401, "Invalid or expired access token"));
    }
};

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ApiError(401, "Authentication required"));
        }
        const hasPermission = req.user.roles.some((role) => allowedRoles.includes(role));
        if (!hasPermission) {
            return next(new ApiError(403, "You are not authorized to perform this action"));
        }
        next();
    };
};