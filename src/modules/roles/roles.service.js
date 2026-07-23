import { getAllRoles, getRoleById, getAllPermissions, assignRole, removeRole } from "./roles.repository.js";
import ApiError from "../../utils/ApiError.js";
import { getUserById } from "../user/user.repository.js";

export const listRoles = async () => {
    return await getAllRoles();
}



export const getRole = async (roleId) => {
    const role = await getRoleById(roleId);
    if (!role) {
        throw new ApiError(404, "Role not found");
    }
    return role;
}



export const listPermissions = async () => {
    return await getAllPermissions();
}



export const assignUserRole = async (userId, roleId) => {
    const role = await getRoleById(roleId);
    if (!role) {
        throw new ApiError(404, "Role not found");
    }

    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    await assignRole(userId, roleId);
}



export const removeUserRole = async (userId, roleId) => {
    const role = await getRoleById(roleId);
    if (!role) {
        throw new ApiError(404, "Role not found");
    }

    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    await removeRole(userId, roleId);
}