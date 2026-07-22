import { z } from "zod";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
    return (req, res, next) => {
        const validator = z.object({
            body: schema.body ?? z.object({}).passthrough(),
            params: schema.params ?? z.object({}).passthrough(),
            query: schema.query ?? z.object({}).passthrough(),
        });
        const result = validator.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            return next(new ApiError(400, "Validation failed.", errors));
        }
        req.body = result.data.body;
        req.params = result.data.params;
        if (result.data.query) {
            Object.assign(req.query, result.data.query);
        }
        next();
    };
};

export default validate;