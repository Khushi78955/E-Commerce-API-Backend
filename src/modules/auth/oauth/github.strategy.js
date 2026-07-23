import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { normalizeProviderProfile } from "../utils/normalizeProviderProfile.js";


passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            scope: ["user:email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const normalizedProfile = normalizeProviderProfile("github", profile);
                done(null, {
                    profile: normalizedProfile,
                });
            } catch (error) {
                done(error, null);
            }
        }
    )
)