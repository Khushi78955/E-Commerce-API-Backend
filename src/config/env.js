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
  CLIENT_URL: str(),
});

export default env;