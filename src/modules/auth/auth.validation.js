import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        firstName: z
            .string()
            .trim()
            .min(2, "First name must be at least 2 characters.")
            .max(50),

        lastName: z
            .string()
            .trim()
            .min(2, "Last name must be at least 2 characters.")
            .max(50),

        email: z
            .string()
            .trim()
            .email("Invalid email address."),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .max(100)
            .regex(/[A-Z]/, "Password must contain an uppercase letter.")
            .regex(/[a-z]/, "Password must contain a lowercase letter.")
            .regex(/[0-9]/, "Password must contain a number.")
            .regex(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain a special character."
            ),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .email("Invalid email address."),

        password: z
            .string()
            .min(1, "Password is required."),
    }),
});

export const refreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z
            .string()
            .min(1, "Refresh token is required."),
    }),
});

export const verifyEmailSchema = z.object({
    query: z.object({
        token: z
            .string()
            .min(1, "Verification token is required."),
    }),
});

export const forgotPasswordSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .email("Invalid email address."),
    }),
});

export const resetPasswordSchema = z.object({
    body: z.object({
        token: z
            .string()
            .min(1, "Reset token is required."),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .max(100)
            .regex(/[A-Z]/, "Password must contain an uppercase letter.")
            .regex(/[a-z]/, "Password must contain a lowercase letter.")
            .regex(/[0-9]/, "Password must contain a number.")
            .regex(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain a special character."
            ),
    }),
});


export const resendVerificationEmailSchema = {
    body: z.object({
        email: z.email("Invalid email address"),
    }),
};