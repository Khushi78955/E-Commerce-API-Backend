import Stripe from "stripe";

import ApiError from "../../utils/ApiError.js";

import { getOrderById, getPaymentByOrderId, createPayment, updatePaymentStatus, updateOrderStatus, getAllPayments } from "./payment.repository.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createPaymentIntent = async (orderId, userId) => {
    const order = await getOrderById(orderId, userId);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    
    const payment = await getPaymentByOrderId(order.id);
    if (payment?.status === "paid") {
        throw new ApiError(400, "Order has already been paid");
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number(order.total) * 100),
        currency: "inr",
        metadata: {
            orderId: order.id.toString(),
        },
    });

    await createPayment(order.id, paymentIntent.id, order.total, "pending");

    return {
        clientSecret: paymentIntent.client_secret,
    };
};

export const handleWebhook = async (event) => {
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        await updatePaymentStatus(paymentIntent.id, "paid");
        await updateOrderStatus(
            Number(paymentIntent.metadata.orderId),
            "confirmed"
        );
    }

    if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object;
        await updatePaymentStatus(paymentIntent.id, "failed");
        await updateOrderStatus(
            Number(paymentIntent.metadata.orderId),
            "cancelled"
        );
    }
};

export const getPayments = async () => {
    return await getAllPayments();
};