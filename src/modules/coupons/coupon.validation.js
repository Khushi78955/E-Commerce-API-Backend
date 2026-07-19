import { z } from "zod";

export const createCouponSchema = z.object({
    body: z.object({
        code: z
            .string()
            .trim()
            .min(3)
            .max(50),

        discountType: z.enum([
            "percentage",
            "fixed",
        ]),

        discountValue: z.coerce
            .number()
            .positive(),

        minimumOrderAmount: z.coerce
            .number()
            .min(0),

        usageLimit: z.coerce
            .number()
            .int()
            .positive(),

        expiresAt: z
            .string()
            .datetime(),
    }),
});

export const updateCouponSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive(),
    }),

    body: z.object({
        code: z
            .string()
            .trim()
            .min(3)
            .max(50)
            .optional(),

        discountType: z
            .enum([
                "percentage",
                "fixed",
            ])
            .optional(),

        discountValue: z.coerce
            .number()
            .positive()
            .optional(),

        minimumOrderAmount: z.coerce
            .number()
            .min(0)
            .optional(),

        usageLimit: z.coerce
            .number()
            .int()
            .positive()
            .optional(),

        expiresAt: z
            .string()
            .datetime()
            .optional(),
    }),
});

export const couponIdSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive(),
    }),
});
