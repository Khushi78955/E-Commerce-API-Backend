import { z } from "zod";

export const assignRoleSchema = z.object({
    body: z.object({
        userId: z.coerce
            .number()
            .int()
            .positive(),

        roleId: z.coerce
            .number()
            .int()
            .positive()
    })
});

export const removeRoleSchema = z.object({
    body: z.object({
        userId: z.coerce
            .number()
            .int()
            .positive(),

        roleId: z.coerce
            .number()
            .int()
            .positive()
    })
});