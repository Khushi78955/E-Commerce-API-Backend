import jwt from "jsonwebtoken";
import hashToken from "../../../utils/hashToken.js";
import generateTokens from "../../../utils/generateTokens.js";
import { findUserById, getUserRoles, createRefreshToken, createUserSession, updateLastLogin } from "../auth.repository.js";
import { findOAuthAccount, findUserByEmail, createOAuthAccount, createOAuthUser} from "./oauth.repository.js";
import { generateOAuthUser } from "../utils/generateOAuthUser.js";
import hashPassword from "../../../utils/hashPassword.js";

const getRoleNames = (roles) => {
    return roles.map((role) => role.name);
};

export const loginWithOAuth = async ({profile, deviceName, ipAddress, userAgent}) => {
    let account = await findOAuthAccount(profile.provider, profile.providerId);
    let user;
    if (account) {
        user = await findUserById(account.user_id);
    } else {
        user = await findUserByEmail(profile.email);
        if (!user) {
            const oauthUser = generateOAuthUser(profile);
            const passwordHash = await hashPassword(oauthUser.password);
            user = await createOAuthUser({
                firstName: oauthUser.firstName,
                lastName: oauthUser.lastName,
                email: oauthUser.email,
                passwordHash,
                isEmailVerified: oauthUser.isEmailVerified,
            });
        }
        await createOAuthAccount({
            userId: user.id,
            provider: profile.provider,
            providerUserId: profile.providerId,
        });
    }

    const roles = await getUserRoles(user.id);
    const { accessToken, refreshToken, jti } = generateTokens({
        userId: user.id,
        email: user.email,
        roles: getRoleNames(roles),
    });

    const refreshTokenHash = hashToken(refreshToken);
    const refreshTokenExpiry = jwt.decode(refreshToken).exp * 1000;
    const refreshTokenRecord = await createRefreshToken({
        userId: user.id,
        jti,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(refreshTokenExpiry),
    });

    await createUserSession({
        userId: user.id,
        refreshTokenId: refreshTokenRecord.id,
        deviceName,
        ipAddress,
        userAgent,
    });

    await updateLastLogin(user.id);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            profileImage: user.profile_image_url,
            roles: getRoleNames(roles),
        },
    };
};