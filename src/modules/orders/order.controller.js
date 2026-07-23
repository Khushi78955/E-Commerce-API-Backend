import asyncHandler from "../../middlewares/asyncHandler.js";

import {checkout, getMyOrders, getMyOrderById, getOrders, changeOrderStatus} from "./order.service.js";

export const createOrder = asyncHandler(async (req, res) => {
    const { addressId, couponCode } = req.body;
    const order = await checkout(
        req.user.userId,
        addressId,
        couponCode
    );
    res.status(201).json({
        success: true,
        message: "Order created successfully.",
        data: order,
    });
});


export const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await getMyOrders(req.user.userId);
    res.status(200).json({
        success: true,
        data: orders,
    });
});


export const getUserOrderById = asyncHandler(async (req, res) => {
    const order = await getMyOrderById(
        Number(req.params.id),
        req.user.userId
    );
    res.status(200).json({
        success: true,
        data: order,
    });
});


export const getAllOrders = asyncHandler(async (_req, res) => {
    const orders = await getOrders();
    res.status(200).json({
        success: true,
        data: orders,
    });
});


export const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await changeOrderStatus(
        Number(req.params.id),
        req.body.status
    );
    res.status(200).json({
        success: true,
        message: "Order status updated successfully.",
        data: order,
    });
});