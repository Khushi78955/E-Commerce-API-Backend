import { z } from "zod";

export const createCategorySchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(1, "Category name is required.")
            .max(100, "Category name cannot exceed 100 characters."),

        slug: z
            .string()
            .trim()
            .min(1, "Slug is required.")
            .max(120, "Slug cannot exceed 120 characters."),

        description: z
            .string()
            .trim()
            .optional(),

        parent_category_id: z
            .number()
            .int()
            .positive("Parent category ID must be a positive integer.")
            .optional(),
    }),
});

export const updateCategorySchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(1, "Category name cannot be empty.")
            .max(100, "Category name cannot exceed 100 characters.")
            .optional(),

        slug: z
            .string()
            .trim()
            .min(1, "Slug cannot be empty.")
            .max(120, "Slug cannot exceed 120 characters.")
            .optional(),

        description: z
            .string()
            .trim()
            .optional(),

        parent_category_id: z
            .number()
            .int()
            .positive("Parent category ID must be a positive integer.")
            .optional(),
    }),
});

export const categoryIdSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive("Category ID must be a positive integer."),
    }),
});