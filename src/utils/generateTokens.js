import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import env from "../config/env.js";

const generateTokens = ({userId, email, roles}) => {
    const jti = uuidv4();
    const accessToken = jwt.sign(
        {userId, email, roles},
        env.JWT_ACCESS_SECRET,
        {expiresIn: env.JWT_ACCESS_EXPIRES_IN}
    )
    const refreshToken = jwt.sign(
        {userId, jti},
        env.JWT_REFRESH_SECRET,
        {expiresIn: env.JWT_REFRESH_EXPIRES_IN}
    )

    return {
        accessToken, refreshToken, jti
    }
}

export default generateTokens;