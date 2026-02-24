/**
 * ✅ Better Auth Configuration for Convex
 * 
 * This file sets up authentication using Better Auth + Convex
 */

import { createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import type { GenericCtx } from "@convex-dev/better-auth/utils";
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { components } from "../_generated/api";
import type { DataModel } from "../_generated/dataModel";
import authConfig from "../auth.config";
import schema from "./schema";

// Better Auth Component
export const authComponent = createClient<DataModel, typeof schema>(
    components.betterAuth,
    {
        local: { schema },
        verbose: false,
    },
);

/**
 * ✅ Better Auth Options
 * 
 * 📝 TEACHER EXPLANATION OF WHAT WAS WRONG:
 * 
 * ISSUE #1: process.env.SITE_URL was undefined
 * - Before: You didn't have SITE_URL in .env.local
 * - Now: Added SITE_URL=http://localhost:3000 to .env.local
 * - Why needed: Better Auth needs to know your app's URL for redirects after login
 * 
 * ISSUE #2: process.env.BETTER_AUTH_SECRET was undefined
 * - Before: You didn't have BETTER_AUTH_SECRET in .env.local
 * - Now: Added BETTER_AUTH_SECRET=... to .env.local
 * - Why needed: This encrypts user sessions (like a master password for auth)
 * - Without it: Sessions can't be encrypted = auth fails = 500 error
 * 
 * 🎯 WHAT HAPPENS WITHOUT THESE:
 * 1. Better Auth tries to initialize
 * 2. secret = undefined (can't encrypt sessions)
 * 3. baseURL = undefined (doesn't know where to redirect)
 * 4. Database connection fails
 * 5. Timeout after 81 seconds
 * 6. Returns 500 error
 */
export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
    return {
        appName: "My App", // Name of your application
        
        // ✅ FIXED: Now reads SITE_URL from .env.local
        // This is where your Next.js app runs (http://localhost:3000 in dev)
        baseURL: process.env.SITE_URL,
        
        // ✅ FIXED: Now reads BETTER_AUTH_SECRET from .env.local
        // This encrypts sessions, tokens, and cookies
        // CRITICAL: Without this, auth cannot work!
        secret: process.env.BETTER_AUTH_SECRET,
        
        // Database adapter - connects Better Auth to Convex
        database: authComponent.adapter(ctx),
        
        // Enable email & password authentication
        emailAndPassword: {
            enabled: true,
        },
        
        // Convex plugin integration
        plugins: [convex({ authConfig })],
    } satisfies BetterAuthOptions;
};

// For `@better-auth/cli` - used when running CLI commands
export const options = createAuthOptions({} as GenericCtx<DataModel>);

// Better Auth Instance - creates the auth handler
export const createAuth = (ctx: GenericCtx<DataModel>) => {
    return betterAuth(createAuthOptions(ctx));
};

/**
 * 📝 LEARNING SUMMARY:
 * 
 * Environment Variables Needed:
 * ✅ SITE_URL - Your app's URL
 * ✅ BETTER_AUTH_SECRET - Encryption key for sessions
 * ✅ NEXT_PUBLIC_CONVEX_URL - Convex backend URL
 * 
 * Files Needed:
 * ✅ convex/schema.ts - Main schema (was missing!)
 * ✅ convex/betterAuth/schema.ts - Auth tables schema
 * ✅ convex/auth.config.ts - Auth provider config
 * ✅ convex/http.ts - HTTP routes
 * ✅ app/api/auth/[...all]/route.ts - Next.js API route
 * 
 * 🎯 After these fixes:
 * - Auth will initialize properly
 * - No more 500 errors
 * - No more 81-second timeouts
 * - Session endpoint will work
 */
