import ApiError from "../../utils/ApiError.js";

import { createCoupon, getAllCoupons, getCouponById, getCouponByCode, updateCoupon, deleteCoupon } from "./coupon.repository.js";

export const createNewCoupon = async (code, discountType, discountValue, minimumOrderAmount, usageLimit, expiresAt) => {
    const existingCoupon = await getCouponByCode(code);
    if (existingCoupon) {
        throw new ApiError(400, "Coupon code already exist");
    }

    return await createCoupon(code, discountType, discountValue, minimumOrderAmount, usageLimit, expiresAt);
};


export const getCoupons = async () => {
    return await getAllCoupons();
};


export const updateExistingCoupon = async (id, updates) => {
    const coupon = await getCouponById(id);

    if (!coupon) {
        throw new ApiError(404, "Coupon not found");
    }

    if (updates.code) {
        const existingCoupon = await getCouponByCode(updates.code);
        if (existingCoupon && existingCoupon.id !== id) {
            throw new ApiError(400, "Coupon code already exists");
        }
    }

    const mappedUpdates = {};
    if (updates.code !== undefined) {
        mappedUpdates.code = updates.code;
    }
    if (updates.discountType !== undefined) {
        mappedUpdates.discount_type = updates.discountType;
    }
    if (updates.discountValue !== undefined) {
        mappedUpdates.discount_value = updates.discountValue;
    }
    if (updates.minimumOrderAmount !== undefined) {
        mappedUpdates.minimum_order_amount = updates.minimumOrderAmount;
    }
    if (updates.usageLimit !== undefined) {
        mappedUpdates.usage_limit = updates.usageLimit;
    }
    if (updates.expiresAt !== undefined) {
        mappedUpdates.expires_at = updates.expiresAt;
    }

    return await updateCoupon(id, mappedUpdates);
};

export const removeCoupon = async (id) => {
    const coupon = await getCouponById(id);
    if (!coupon) {
        throw new ApiError(404, "Coupon not found");
    }
    return await deleteCoupon(id);
};
