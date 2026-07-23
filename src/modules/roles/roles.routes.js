import { Router } from "express";
import { protect, authorize } from "../auth/auth.middleware.js";
import { validate } from "../../middlewares/validate.js";

import { listRolesController, getRoleController, listPermissionsController, assignUserRoleController, removeUserRoleController } from "./roles.controller.js";
import { assignRoleSchema, removeRoleSchema } from "./roles.validation.js";

const router = Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/", listRolesController);
router.get("/:id", getRoleController);
router.get("/permissions/all", listPermissionsController);
router.post("/assign", validate(assignRoleSchema), assignUserRoleController)
router.delete("/remove", validate(removeRoleSchema), removeUserRoleController)

export default router;