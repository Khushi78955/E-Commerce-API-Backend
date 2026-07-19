import dotenv from "dotenv";
import { cleanEnv, port, str } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ["development", "production", "test"],
        default: "development",
    }),

    PORT: port({ default: 5000 }),

    DATABASE_URL: str(),

    JWT_ACCESS_SECRET: str(),
    JWT_REFRESH_SECRET: str(),

    JWT_ACCESS_EXPIRES_IN: str(),
    JWT_REFRESH_EXPIRES_IN: str(),

    CLIENT_URL: str(),

    SMTP_HOST: str(),
    SMTP_PORT: port(),
    SMTP_USER: str(),
    SMTP_PASS: str(),
});

export default env;