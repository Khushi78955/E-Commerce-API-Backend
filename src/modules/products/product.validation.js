import { z } from "zod";

export const productIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
});

export const createProductSchema = z.object({
    body: z.object({
        category_id: z.coerce.number().int().positive(),

        name: z
            .string()
            .trim()
            .min(2)
            .max(255),

        slug: z
            .string()
            .trim()
            .min(2)
            .max(255),

        description: z
            .string()
            .trim()
            .optional(),

        sku: z
            .string()
            .trim()
            .min(1)
            .max(100),

        price: z
            .number()
            .nonnegative(),

        discount_price: z
            .number()
            .nonnegative()
            .nullable()
            .optional(),

        is_active: z
            .boolean()
            .optional(),
    }),
});

export const updateProductSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),

    body: z.object({
        category_id: z.coerce
            .number()
            .int()
            .positive()
            .optional(),

        name: z
            .string()
            .trim()
            .min(2)
            .max(255)
            .optional(),

        slug: z
            .string()
            .trim()
            .min(2)
            .max(255)
            .optional(),

        description: z
            .string()
            .trim()
            .optional(),

        sku: z
            .string()
            .trim()
            .min(1)
            .max(100)
            .optional(),

        price: z
            .number()
            .nonnegative()
            .optional(),

        discount_price: z
            .number()
            .nonnegative()
            .nullable()
            .optional(),

        is_active: z
            .boolean()
            .optional(),
    }),
});