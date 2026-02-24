import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    plugins: [convexClient()],
});

// ✅ Export these for easy use in components
export const {
    signIn,
    signUp,
    signOut,
    useSession
} = authClient;