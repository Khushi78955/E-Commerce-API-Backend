import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import env from "./config/env.js"

import rateLimiter from "./middlewares/rateLimiter.js";
import routes from "./routes/index.js"
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js"
import userRoutes from "./modules/user/user.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import rolesRoutes from "./modules/roles/roles.routes.js";
import uploadRoutes from "./modules/upload/upload.routes.js";

import "./listeners/auth.listener.js";

const app = express();

app.use(helmet());

app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(compression());

app.use(
    "/api/v1/payments/webhook",
    express.raw({ type: "application/json" })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    })
})

app.use(rateLimiter);
app.use("/", routes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/roles", rolesRoutes);
app.use("/api/v1/uploads", uploadRoutes);



app.use(notFound);
app.use(errorHandler);

export default app;