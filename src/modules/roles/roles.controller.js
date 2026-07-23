import {listRoles, getRole, listPermissions, assignUserRole, removeUserRole} from "./roles.service.js";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


export const listRolesController = asyncHandler(async (req, res) => {
    const roles = await listRoles();
    return res.status(200).json(
        new ApiResponse(200, roles, "Roles fetched successfully")
    )
})


export const getRoleController = asyncHandler(async (req, res) => {
    const role = await getRole(req.params.id);
    return res.status(200).json(
        new ApiResponse(200, role, "Role fetched successfully"
        )
    )
})


export const listPermissionsController = asyncHandler(async (req, res) => {
    const permissions = await listPermissions();
    return res.status(200).json(
        new ApiResponse(200, permissions, "Permissions fetched successfully")
    )
})



export const assignUserRoleController = asyncHandler(async (req, res) => {
    const { userId, roleId } = req.body;
    await assignUserRole(userId, roleId);
    return res.status(200).json(
        new ApiResponse(200, null, "Role assigned successfully")
    )
})


export const removeUserRoleController = asyncHandler(async (req, res) => {
    const { userId, roleId } = req.body;
    await removeUserRole(userId, roleId);
    return res.status(200).json(
        new ApiResponse(200, null, "Role removed successfully")
    )
})