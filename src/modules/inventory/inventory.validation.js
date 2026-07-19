import { z } from "zod";

export const productIdSchema = z.object({
    params: z.object({
        productId: z.coerce.number().int().positive(),
    }),
});

export const updateInventorySchema = z.object({
    params: z.object({
        productId: z.coerce.number().int().positive(),
    }),

    body: z.object({
        quantity: z.coerce.number().int().min(0),
    }),
});