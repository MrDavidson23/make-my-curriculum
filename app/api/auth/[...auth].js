import { passportAuth } from "blitz"
import db from "db"
import { Strategy as TwitterStrategy } from "passport-twitter"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    {
      strategy: new TwitterStrategy(
        {
          consumerKey: process.env.TWITTER_CONSUMER_KEY,
          consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
          callbackURL:
            process.env.NODE_ENV === "production"
              ? "https://example.com/api/auth/twitter/callback"
              : "http://localhost:3000/api/auth/twitter/callback",
          includeEmail: true,
        },
        async function (_token, _tokenSecret, profile, done) {
          console.log("profile", profile)
          const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Twitter OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "twitter",
          }
          done(undefined, { publicData })
        }
      ),
    },
  ],
})
