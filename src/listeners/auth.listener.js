import eventBus from "../events/eventBus.js";
import { emailQueue } from "../queues/email.queue.js";

eventBus.on(
    "auth.emailVerificationRequested",
    async ({ email, firstName, verificationToken }) => {
        await emailQueue.add("send-verification-email", {
            email,
            firstName,
            token: verificationToken,
        });
    }
);

eventBus.on("user.forgot-password", async ({ email, firstName, token }) => {
    await emailQueue.add("send-reset-password-email", {
        email,
        firstName,
        token,
    });
});