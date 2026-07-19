import {Router} from "express";

import { createOrder,getUserOrders, getUserOrderById, getAllOrders, updateOrderStatus } from "./order.controller.js";
import {createOrderSchema, updateOrderStatusSchema, orderIdSchema} from "./order.validation.js";

import validate from "../../middlewares/validate.js";
import { protect, authorize } from "../auth/auth.middleware.js";

const router = Router();

router.use(protect);

router.post("/", validate(createOrderSchema), createOrder);
router.get("/", protect, getUserOrders);
router.get("/all", authorize("admin"), getAllOrders);
router.get("/:id", validate(orderIdSchema), getUserOrderById);
router.patch("/:id/status", authorize("admin"), validate(updateOrderStatusSchema), updateOrderStatus)

export default router;