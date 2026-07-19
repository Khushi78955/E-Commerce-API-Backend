import asyncHandler from "../../utils/asyncHandler.js";

import {getAllAddressesByUserIdService, getAddressByIdService, createAddressService, updateAddressService, deleteAddressService} from "./address.service.js";

export const getAllAddresses = asyncHandler(async (req, res) => {
    const addresses = await getAllAddressesByUserIdService(req.user.userId);
    res.status(200).json({
        success: true,
        data: addresses,
    });
});

export const getAddressById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const address = await getAddressByIdService(id, req.user.userId);
    res.status(200).json({
        success: true,
        data: address,
    });
});

export const createAddress = asyncHandler(async (req, res) => {
    const address = await createAddressService(req.user.userId, req.body);
    res.status(201).json({
        success: true,
        message: "Address created successfully.",
        data: address,
    });
});

export const updateAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const address = await updateAddressService(id, req.user.userId, req.body);
    res.status(200).json({
        success: true,
        message: "Address updated successfully.",
        data: address,
    });
});

export const deleteAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deleteAddressService(id, req.user.userId);
    res.status(200).json({
        success: true,
        message: "Address deleted successfully.",
    });
});