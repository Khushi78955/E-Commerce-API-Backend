import { Router } from "express";

import { getInventoryByProductId, createInventory, updateInventory } from "./inventory.repository.js";
import { productIdSchema, updateInventorySchema } from "./inventory.validation.js";

import validate from "../../middlewares/validate.js";
import {protect, authorize} from "../auth/auth.middleware.js"
import ROLES from "../../constants/roles.js";

const router = Router();

router.get("/:productId", validate(productIdSchema), getInventoryByProductId);
router.post("/:productId", protect, authorize(ROLES.ADMIN), validate(updateInventorySchema), createInventory);
router.patch("/:productId", protect, authorize(ROLES.ADMIN), validate(updateInventorySchema), updateInventory);


export default router;