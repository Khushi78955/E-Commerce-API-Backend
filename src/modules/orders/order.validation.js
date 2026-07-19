import { z } from "zod";

export const createOrderSchema = z.object({
    body: z.object({
        addressId: z.coerce
            .number({
                required_error: "Address ID is required.",
            })
            .int()
            .positive(),

        couponCode: z
            .string()
            .trim()
            .optional(),
    }),
});

export const updateOrderStatusSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive(),
    }),

    body: z.object({
        status: z.enum([
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
            "refunded",
        ]),
    }),
});

export const orderIdSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive(),
    }),
});