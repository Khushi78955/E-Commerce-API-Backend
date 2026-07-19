import { Router } from "express";

import { getCartItems, addToCart, updateCartItem, removeCartItem, clearCart } from "./cart.controller.js";

import validate from "../../middlewares/validate.js";
import {protect} from "../auth/auth.middleware.js"

import { productIdSchema, addToCartSchema, updateCartSchema } from "./cart.validation.js";

const router = Router();

router.use(protect);

router.get("/", getCartItems);
router.post("/", validate(addToCartSchema), addToCart);
router.patch("/:productId", validate(updateCartSchema), updateCartItem);
router.delete("/:productId", validate(productIdSchema), removeCartItem);

router.delete("/", clearCart);

export default router;