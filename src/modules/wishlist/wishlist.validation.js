import { z } from "zod";

export const productIdSchema = z.object({
    params: z.object({
        productId: z.coerce.number().int().positive(),
    }),
});

export const addToWishlistSchema = z.object({
    body: z.object({
        product_id: z.coerce.number().int().positive(),
    }),
});