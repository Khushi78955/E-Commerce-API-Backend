import { z } from "zod";

export const addressIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
});

export const createAddressSchema = z.object({
    body: z.object({
        full_name: z.string().trim().min(2).max(150),
        phone: z.string().trim().min(8).max(20),
        address_line_1: z.string().trim().min(5),
        address_line_2: z.string().trim().optional(),
        city: z.string().trim().min(2).max(100),
        state: z.string().trim().min(2).max(100),
        country: z.string().trim().min(2).max(100),
        postal_code: z.string().trim().min(3).max(20),
        is_default: z.boolean().optional(),
    }),
});

export const updateAddressSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),

    body: z.object({
        full_name: z.string().trim().min(2).max(150).optional(),
        phone: z.string().trim().min(8).max(20).optional(),
        address_line_1: z.string().trim().min(5).optional(),
        address_line_2: z.string().trim().optional(),
        city: z.string().trim().min(2).max(100).optional(),
        state: z.string().trim().min(2).max(100).optional(),
        country: z.string().trim().min(2).max(100).optional(),
        postal_code: z.string().trim().min(3).max(20).optional(),
        is_default: z.boolean().optional(),
    }),
});