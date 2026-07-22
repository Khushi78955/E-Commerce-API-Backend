import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { normalizeProviderProfile } from "../utils/normalizeProviderProfile.js";


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const normalizedProfile = normalizeProviderProfile("google", profile);
                done(null, {
                    profile: normalizedProfile,
                });
            } catch (error) {
                done(error, null);
            }
        }
    )
)