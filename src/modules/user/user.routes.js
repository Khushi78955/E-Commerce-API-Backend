import {Router} from "express";

import { protect } from "../auth/auth.middleware.js";
import { validate } from "../../middlewares/validate.js";

import { getProfileController, updateProfileController, changePasswordController, deleteAccountController } from "./user.controller.js";
import { updateProfileSchema, changePasswordSchema } from "./user.validation.js";


const router = Router();

router.use(protect);
router.get("/profile", getProfileController);
router.patch("/profile", validate(updateProfileSchema), updateProfileController)
router.patch("/change-password", validate(changePasswordSchema), changePasswordController);
router.delete("/account", deleteAccountController);

export default router;