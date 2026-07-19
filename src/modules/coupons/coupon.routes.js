import express from "express";

import {create, getAll, update, remove} from "./coupon.controller.js";
import {protect, authorize} from "../auth/auth.middleware.js";
import validate from "../../middlewares/validate.js";

import { createCouponSchema, updateCouponSchema, couponIdSchema } from "./coupon.validation.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), validate(createCouponSchema), create);
router.get("/", protect, authorize("admin"), getAll);
router.patch("/:id", protect, authorize("admin"), validate(updateCouponSchema), update);
router.delete("/:id", protect, authorize("admin"), validate(couponIdSchema), remove);

export default router;