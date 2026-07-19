import express from "express"

import { createIntent, webhook, getAllPayments } from "./payment.controller.js"

import { protect, authorize } from "../auth/auth.middleware.js"
import validate from "../../middlewares/validate.js"

import { createPaymentIntentSchema } from "./payment.validation.js"

const router = express.Router();

router.post("/create-intent", protect, validate(createPaymentIntentSchema), createIntent);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);
router.get("/", protect, authorize("admin"), getAllPayments)

export default router;