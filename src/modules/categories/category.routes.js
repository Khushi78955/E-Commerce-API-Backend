import {Router} from "express";

import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "./category.repository.js";
import { createCategorySchema, updateCategorySchema, categoryIdSchema } from "./category.validation.js";

import validate from "../../middlewares/validate.js";
import {protect, authorize} from "../auth/auth.middleware.js";
import ROLES from "../../constants/roles.js"

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", validate(categoryIdSchema), getCategoryById);
router.post("/", protect, authorize(ROLES.ADMIN), validate(createCategorySchema), createCategory);
router.patch("/:id", protect, authorize(ROLES.ADMIN), validate(categoryIdSchema), validate(updateCategorySchema), updateCategory);
router.delete("/:id", protect, authorize(ROLES.ADMIN), validate(categoryIdSchema), deleteCategory);

export default router;