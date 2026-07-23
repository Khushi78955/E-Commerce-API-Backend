import pool from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";
import { verifyCoupon } from "../coupons/coupon.service.js";
import { getCartItemsByUser, getAddressById, createOrder, createOrderItem, updateInventory, clearCart, getOrdersByUser, getOrderById, getAllOrders, updateOrderStatus, incrementCouponUsage } from "./order.repository.js";


export const checkout = async (userId, addressId, couponCode) => {
    const address = await getAddressById(addressId, userId);
    if(!address){
        throw new ApiError(404, "Address not found");
    }

    const cartItems = await getCartItemsByUser(userId);
    if (cartItems.length === 0) {
        throw new ApiError(400, "Cart is empty");
    }

    let subtotal = 0;
    for (const item of cartItems){
        if(item.quantity > item.stock){
            throw new ApiError(400, `Insufficient stock for ${item.name}`);
        }
        const price = item.discount_price ?? item.price;
        subtotal += price * item.quantity;
    }

    let discount = 0;
    let coupon = null;

    if (couponCode) {
        const result = await verifyCoupon(couponCode, subtotal);
        coupon = result.coupon;
        discount = result.discount;
    }

    const shippingCost = 0;
    const total = subtotal - discount + shippingCost;
    const client = await pool.connect();

    try{
        await client.query("BEGIN");
        const order = await createOrder(client, userId, addressId, subtotal, discount, shippingCost, total)
        for(const item of cartItems){
            const price = item.discount_price ?? item.price
            await createOrderItem(client, order.id, item.product_id, item.quantity, price, price * item.quantity)
            await updateInventory(client, item.product_id, item.quantity)
        }
        await clearCart(client, userId);
        if (coupon) {
            await incrementCouponUsage(client, coupon.id);
        }
        await client.query("COMMIT");
        return order;
    } catch(err){
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }   
}


export const getMyOrders = async (userId) => {
    return await getOrdersByUser(userId);
}


export const getMyOrderById = async (orderId, userId) => {
    const order = await getOrderById(orderId, userId);
    if(!order){
        throw new ApiError(404, "Order not found");
    }
    return order;
}


export const getOrders = async () => {
    return await getAllOrders();
};

export const changeOrderStatus = async (orderId, status) => {
    const order = await updateOrderStatus(orderId, status);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    return order;
};