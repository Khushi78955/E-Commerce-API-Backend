import {Router} from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import categoryRoutes from "../modules/categories/category.routes.js";
import productRoutes from "../modules/products/product.routes.js";
import inventoryRoutes from "../modules/inventory/inventory.routes.js";
import addressRoutes from "../modules/addresses/address.routes.js";
import cartRoutes from "../modules/cart/cart.routes.js";
import wishlistRoutes from "../modules/wishlist/wishlist.routes.js";
import orderRoutes from "../modules/orders/order.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js"

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
router.use("/api/v1/addresses", addressRoutes);
router.use("/api/v1/cart", cartRoutes);
router.use("/api/v1/wishlist", wishlistRoutes);
router.use("/api/v1/orders", orderRoutes);
router.use("/api/v1/payments", paymentRoutes);

export default router;