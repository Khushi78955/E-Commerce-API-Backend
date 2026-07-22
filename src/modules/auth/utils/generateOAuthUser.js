import crypto from "crypto";

export const generateOAuthUser = (profile) => {
    const [firstName, ...rest] = profile.name.trim().split(" ");
    return {
        firstName,
        lastName: rest.join(" "),
        email: profile.email,
        password: crypto.randomBytes(32).toString("hex"),
        isEmailVerified: true,
    };
}