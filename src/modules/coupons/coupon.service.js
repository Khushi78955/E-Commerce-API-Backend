import ApiError from "../../utils/ApiError.js";
import { validateCoupon } from "./coupon.repository.js";
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



export const verifyCoupon = async (code, subtotal) => {
    const coupon = await validateCoupon(code);

    if (!coupon) {
        throw new ApiError(404, "Coupon not found.");
    }

    if (new Date(coupon.expires_at) < new Date()) {
        throw new ApiError(400, "Coupon has expired.");
    }

    if (coupon.used_count >= coupon.usage_limit) {
        throw new ApiError(400, "Coupon usage limit reached.");
    }

    if (subtotal < Number(coupon.minimum_order_amount)) {
        throw new ApiError(
            400,
            `Minimum order amount is ₹${coupon.minimum_order_amount}.`
        );
    }

    let discount = 0;

    if (coupon.discount_type === "percentage") {
        discount =
            subtotal * (Number(coupon.discount_value) / 100);
    } else {
        discount = Number(coupon.discount_value);
    }

    if (discount > subtotal) {
        discount = subtotal;
    }

    return {
        coupon,
        discount,
    };
};