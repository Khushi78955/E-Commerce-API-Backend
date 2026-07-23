import { z } from "zod";

export const updateProfileSchema = z.object({
    body: z.object({
        first_name: z
            .string()
            .trim()
            .min(2, "First name must be at least 2 characters.")
            .max(100, "First name cannot exceed 100 characters."),

        last_name: z
            .string()
            .trim()
            .min(2, "Last name must be at least 2 characters.")
            .max(100, "Last name cannot exceed 100 characters."),

        profile_image_url: z
            .string()
            .url("Invalid profile image URL.")
            .optional(),
    }),
});

export const changePasswordSchema = z.object({
    body: z.object({
        currentPassword: z
            .string()
            .min(8, "Current password must be at least 8 characters."),

        newPassword: z
            .string()
            .min(8, "New password must be at least 8 characters.")
            .max(100, "New password cannot exceed 100 characters.")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
            .regex(/[0-9]/, "Password must contain at least one number.")
            .regex(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character."
            )
    })
});
