export const normalizeProviderProfile = (provider, profile) => {
    switch (provider) {
        case "google":
            return {
                provider: "google",
                providerId: profile.id,
                email: profile.emails?.[0]?.value,
                name: profile.displayName,
                avatar: profile.photos?.[0]?.value,
            };

        case "github":
            return {
                provider: "github",
                providerId: profile.id,
                email: profile.emails?.[0]?.value ?? null,
                name: profile.displayName || profile.username,
                avatar: profile.photos?.[0]?.value,
            };

        case "discord":
            return {
                provider: "discord",
                providerId: profile.id,
                email: profile.email,
                name:
                    profile.global_name ??
                    profile.username,
                avatar: profile.avatar,
            };

        default:
            throw new Error("Unsupported OAuth provider.");
    }
};