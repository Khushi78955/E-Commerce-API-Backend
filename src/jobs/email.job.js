import { Worker } from "bullmq";
import redis from "../config/redis.js";
import sendVerificationEmail from "../mail/sendVerificationEmail.js";
import sendResetPasswordEmail from "../mail/sendResetPasswordEmail.js";

const emailWorker = new Worker("email", async (job) => {
    switch (job.name) {
        case "send-verification-email":
            await sendVerificationEmail(job.data);
            break;

        case "send-reset-password-email":
            await sendResetPasswordEmail(job.data);
            break;

        default:
            throw new Error(`Unknown job: ${job.name}`);
    }},
    {
        connection: redis,
    }
);

emailWorker.on("completed", (job) => {
    console.log(`Email job completed: ${job.id}`);
});

emailWorker.on("failed", (job, error) => {
    console.error(`Email job failed: ${job?.id}`, error);
});

export default emailWorker;