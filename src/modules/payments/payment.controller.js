import Stripe from "stripe";

import asyncHandler from "../../middlewares/asyncHandler.js";

import {createPaymentIntent, handleWebhook, getPayments} from "./payment.service.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createIntent = asyncHandler(async (req, res) => {
    const { orderId } = req.body;
    const result = await createPaymentIntent(orderId, req.user.id);
    res.status(200).json({
        success: true,
        message: "Payment Intent created successfully.",
        data: result,
    });
});


export const webhook = async (req, res) => {
    try {
        const signature = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        await handleWebhook(event);
        res.status(200).json({
            received: true,
        });
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
};


export const getAllPayments = asyncHandler(async (req, res) => {
    const payments = await getPayments();
    res.status(200).json({
        success: true,
        message: "Payments fetched successfully.",
        data: payments,
    });
});