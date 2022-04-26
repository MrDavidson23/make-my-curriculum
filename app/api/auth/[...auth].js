import { passportAuth } from "blitz"
import db from "db"
import { Strategy as TwitterStrategy } from "passport-twitter"
import { Strategy as GoogleStrategy } from "passport-google-oidc"

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
              ? "https://makemycurriculum.plataformaelectronicacr.com/api/auth/twitter/callback"
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
    {
      authenticateOptions: { scope: "openid email profile" },
      strategy: new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          //callbackURL: 'https://www.example.com/oauth2/redirect/google'
          callbackURL:
            process.env.NODE_ENV === "production"
              ? "https://makemycurriculum.plataformaelectronicacr.com/api/auth/google/callback"
              : "http://localhost:3000/api/auth/google/callback",
          includeEmail: true,
        },
        async function (_token, _tokenSecret, profile, done) {
          console.log("profile", profile)
          console.log("_token", _token)
          console.log("_tokenSecret", _tokenSecret)

          const email = _tokenSecret.emails[0].value || _tokenSecret.emails[0].value
          //const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Google OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: _tokenSecret.name.GivenName,
              lastName: _tokenSecret.name.familyName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "google",
          }
          done(undefined, { publicData })
        }
      ),
    },
  ],
})
