import { z } from "zod";

export const productIdSchema = z.object({
    params: z.object({
        productId: z.coerce.number().int().positive(),
    }),
});

export const addToCartSchema = z.object({
    body: z.object({
        product_id: z.coerce.number().int().positive(),

        quantity: z.coerce
            .number()
            .int()
            .positive(),
    }),
});

export const updateCartSchema = z.object({
    params: z.object({
        productId: z.coerce.number().int().positive(),
    }),

    body: z.object({
        quantity: z.coerce
            .number()
            .int()
            .positive(),
    }),
});