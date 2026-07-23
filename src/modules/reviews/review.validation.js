import { z } from "zod";

export const createReviewSchema = z.object({
    body: z.object({
        productId: z.coerce.number().int().positive(),
        rating: z.number().int().min(1).max(5),
        comment: z.string().trim().max(1000).optional(),
    }),
});

export const updateReviewSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
    body: z.object({
        rating: z.number().int().min(1).max(5).optional(),
        comment: z.string().trim().max(1000).optional(),
    }),
});

export const reviewIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
});

export const productReviewSchema = z.object({
    params: z.object({
        productId: z.coerce.number().int().positive(),
    }),
});