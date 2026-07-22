import { Router } from "express";

import { registerController, loginController, refreshTokenController, logoutController, logoutAllDevicesController, verifyEmailController, forgotPasswordController, resetPasswordController, getCurrentUserController, resendVerificationEmailController } from "./auth.controller.js";

import { protect } from "./auth.middleware.js";
import validate from "../../middlewares/validate.js"

import { registerSchema, loginSchema, refreshTokenSchema, verifyEmailSchema, forgotPasswordSchema, resetPasswordSchema, resendVerificationEmailSchema} from "./auth.validation.js";


const router = Router();

router.post("/register", validate(registerSchema), registerController)
router.post("/login", validate(loginSchema), loginController)
router.post("/refresh-token", validate(refreshTokenSchema), refreshTokenController)
router.post("/logout", validate(refreshTokenSchema), logoutController)
router.post("/logout-all", protect, logoutAllDevicesController)
router.get("/verify-email", validate(verifyEmailSchema), verifyEmailController)
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPasswordController)
router.post("/reset-password", validate(resetPasswordSchema), resetPasswordController)
router.get("/me", protect, getCurrentUserController)
router.post("/resend-verification", validate(resendVerificationEmailSchema), resendVerificationEmailController);

export default router;