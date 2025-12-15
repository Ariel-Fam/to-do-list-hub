const issuer = process.env.CLERK_FRONTEND_API_URL

if (!issuer) {
  throw new Error('Missing CLERK_JWT_ISSUER_DOMAIN in environment')
}

/**
 * Convex server-side auth configuration for Clerk-issued JWTs.
 * - `domain` must match the `iss` claim in the Clerk JWT (the Clerk instance URL).
 * - `applicationID` must match the Clerk JWT template name (here: "convex").
 */
export default {
  providers: [
    {
      domain: issuer,
      applicationID: 'convex',
    },
  ],
}
