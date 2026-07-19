import { z } from "zod";

export const createPaymentIntentSchema = z.object({
    body: z.object({
        orderId: z.coerce
            .number()
            .int()
            .positive(),
    }),
});