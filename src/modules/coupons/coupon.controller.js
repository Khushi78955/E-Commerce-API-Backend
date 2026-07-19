import asyncHandler from "../../middlewares/asyncHandler.js";

import { createNewCoupon, getCoupons, updateExistingCoupon, removeCoupon } from "./coupon.service.js";

export const create = asyncHandler(async (req, res) => {
    const {code, discountType, discountValue, minimumOrderAmount, usageLimit, expiresAt} = req.body;
    const coupon = await createNewCoupon(code, discountType, discountValue, minimumOrderAmount, usageLimit, expiresAt);
    res.status(201).json({
        success: true,
        message: "Coupon created successfully.",
        data: coupon,
    });
});


export const getAll = asyncHandler(async (req, res) => {
    const coupons = await getCoupons();
    res.status(200).json({
        success: true,
        message: "Coupons fetched successfully.",
        data: coupons,
    });
});


export const update = asyncHandler(async (req, res) => {
    const coupon = await updateExistingCoupon(
        Number(req.params.id),
        req.body
    );
    res.status(200).json({
        success: true,
        message: "Coupon updated successfully.",
        data: coupon,
    });
});


export const remove = asyncHandler(async (req, res) => {
    await removeCoupon(Number(req.params.id));
    res.status(200).json({
        success: true,
        message: "Coupon deleted successfully.",
    });
});