import {Router} from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import categoryRoutes from "../modules/categories/category.routes.js";
import productRoutes from "../modules/products/product.routes.js";
import inventoryRoutes from "../modules/inventory/inventory.routes.js";


const router = Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "E-Commerce API",
    })
})

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/categories", categoryRoutes);
router.use("/api/v1/products", productRoutes);
router.use("/api/v1/inventory", inventoryRoutes);

export default router;