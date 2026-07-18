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

const app = express();

app.use(helmet());
app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(compression());
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
app.use(notFound);
app.use(errorHandler);

export default app;