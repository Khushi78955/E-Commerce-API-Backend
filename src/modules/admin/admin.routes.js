import { Router } from "express";
import { protect, authorize } from "../auth/auth.middleware.js";
import validate from "../../middlewares/validate.js";

import {getDashboardController, listUsersController, getUserController, changeUserStatusController} from "./admin.controller.js";
import { updateUserStatusSchema } from "./admin.validation.js";

const router = Router();

router.use(protect);
router.use(authorize("admin"))
router.get("/dashboard", getDashboardController);
router.get("/users", listUsersController);
router.get("/users/:id", getUserController);
router.patch("/users/:id/status", validate(updateUserStatusSchema), changeUserStatusController);

export default router;