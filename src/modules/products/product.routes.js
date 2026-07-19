import {Router} from "express"

import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./product.controller.js"
import { productIdSchema, createProductSchema, updateProductSchema } from "./product.validation.js"

import validate from "../../middlewares/validate.js";
import {protect, authorize} from "../auth/auth.middleware.js";
import ROLES from "../../constants/roles.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", validate(productIdSchema), getProductById);
router.post("/", protect, authorize(ROLES.ADMIN), validate(createProductSchema), createProduct);
router.patch("/:id", protect, authorize(ROLES.ADMIN), validate(updateProductSchema), updateProduct)
router.delete("/:id", protect, authorize(ROLES.ADMIN), validate(productIdSchema), deleteProduct)

export default router;