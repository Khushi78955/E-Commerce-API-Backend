import { Router } from "express";

import upload from "../../middlewares/upload.js";
import { protect, authorize } from "../auth/auth.middleware.js";

import { uploadProfileImage, uploadProductImageController } from "./upload.controller.js";

const router = Router();

router.patch("/profile-image", protect, upload.single("image"), uploadProfileImage);
router.patch("/products/:productId/image", protect, authorize("admin"), upload.single("image"), uploadProductImageController);


export default router;