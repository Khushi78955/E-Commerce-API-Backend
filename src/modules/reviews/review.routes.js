import express from "express";

import { create, getByProduct, update, remove } from "./review.controller.js";
import { protect } from "../auth/auth.middleware.js";
import validate from "../../middlewares/validate.js";
import { createReviewSchema, updateReviewSchema, reviewIdSchema, productReviewSchema } from "./review.validation.js";

const router = express.Router();

router.post("/", protect, validate(createReviewSchema), create);
router.get("/product/:productId", validate(productReviewSchema), getByProduct);
router.patch("/:id", protect, validate(updateReviewSchema), update);
router.delete("/:id", protect, validate(reviewIdSchema), remove)


export default router;