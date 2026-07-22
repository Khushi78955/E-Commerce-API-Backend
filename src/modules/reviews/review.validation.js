import { z } from "zod";

export const createReviewSchema = {
    body: z.object({
        productId: z.uuid(),
        rating: z.number().int().min(1).max(5),
        comment: z.string().trim().max(1000).optional(),
    }),
};

export const updateReviewSchema = {
    body: z.object({
        rating: z.number().int().min(1).max(5).optional(),
        comment: z.string().trim().max(1000).optional(),
    }),
    params: z.object({
        id: z.uuid(),
    }),
};

export const reviewIdSchema = {
    params: z.object({
        id: z.uuid(),
    }),
};

export const productReviewSchema = {
    params: z.object({
        productId: z.uuid(),
    }),
};