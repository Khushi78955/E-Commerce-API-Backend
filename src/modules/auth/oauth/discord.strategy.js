import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { normalizeProviderProfile } from "../utils/normalizeProviderProfile.js";


passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_CALLBACK_URL,
            scope: ["identify", "email"],
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