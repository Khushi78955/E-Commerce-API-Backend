import {Router} from "express";
import authRoutes from "../modules/auth/auth.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "E-Commerce API",
    })
})

router.use("/api/v1/auth", authRoutes);

export default router;