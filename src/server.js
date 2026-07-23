import app from "./app.js";
import env from "./config/env.js";
import pool from "./config/db.js";
import logger from "./config/logger.js";

const startServer = async () => {
    try{
        await pool.query("SELECT NOW()");
        logger.info("PostgreSQL Connected");

        app.listen(env.PORT, () => {
            logger.info(`Server running on port ${env.PORT}`);
        });
    } catch(err){
        logger.error(err);
        process.exit(1);
    }
}
startServer();

