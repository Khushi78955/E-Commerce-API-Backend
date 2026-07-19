import { Router } from "express";
import { getWishlistItems, addToWishlist, removeWishlistItem } from "./wishlist.controller.js";

import validate from "../../middlewares/validate.js";
import { protect } from "../auth/auth.middleware.js";

import { productIdSchema, addToWishlistSchema } from "./wishlist.validation.js";

const router = Router();

router.use(protect);

router.get("/", getWishlistItems);
router.post("/", validate(addToWishlistSchema), addToWishlist);
router.delete("/:productId", validate(productIdSchema), removeWishlistItem);

export default router;