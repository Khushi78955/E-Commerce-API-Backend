import bullmq from "bullmq";
import redis from "../config/redis.js";

const { Queue } = bullmq;

export const emailQueue = new Queue("email", {
    connection: redis,
});