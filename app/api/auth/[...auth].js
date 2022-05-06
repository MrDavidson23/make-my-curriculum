import { passportAuth } from "blitz"
import db from "db"
import { Strategy as TwitterStrategy } from "passport-twitter"
import { Strategy as GoogleStrategy } from "passport-google-oidc"
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2"
import { Strategy as FacebookStrategy } from "passport-facebook"

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
              ? "https://makemycurriculum.plataformaelectronicacr.com/app/api/auth/twitter/callback"
              : "http://localhost:3000/app/api/auth/twitter/callback",
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
              ? "https://makemycurriculum.plataformaelectronicacr.com/app/api/auth/google/callback"
              : "http://localhost:3000/app/api/auth/google/callback",
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
    {
      authenticateOptions: { scope: "r_emailaddress r_liteprofile" },
      profileFields: [
        "id",
        "first-name",
        "last-name",
        "email-address",
        "headline",
        "r_emailaddress",
        "email",
      ],
      strategy: new LinkedInStrategy(
        {
          clientID: process.env.LINKEDIN_KEY,
          clientSecret: process.env.LINKEDIN_SECRET,
          //callbackURL: 'https://www.example.com/oauth2/redirect/google'
          callbackURL:
            process.env.NODE_ENV === "production"
              ? "https://makemycurriculum.plataformaelectronicacr.com/app/api/auth/linkedin/callback"
              : "http://localhost:3000/app/api/auth/linkedin/callback",
          includeEmail: true,
        },
        async function (_token, _tokenSecret, profile, done) {
          console.log("profile", profile)
          console.log("_token", _token)
          console.log("_tokenSecret", _tokenSecret)

          const profile2 = await fetch(
            `https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))`,
            {
              headers: {
                Authorization: `Bearer ${_token}`,
                "Content-Type": "application/json",
              },
            }
          )
          //console.log("profile2", JSON.stringify(await profile2.json(), null, 4))

          //const email = _r_emailaddress.elements[0].handle~.emailAddress
          const email = (await profile2.json()).elements[0]["handle~"].emailAddress
          //const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("LinkedIn OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.name.givenName,
              lastName: profile.name.familyName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "Linkedin",
          }
          done(undefined, { publicData })
        }
      ),
    },
    {
      authType: "reauthenticate",
      profileFields: ["user_birthday", "id", "displayName", "photos", "email"],
      authenticateOptions: { scope: "email public_profile user_birthday" },
      strategy: new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          //callbackURL: 'https://www.example.com/oauth2/redirect/google'
          callbackURL:
            process.env.NODE_ENV === "production"
              ? "https://makemycurriculum.plataformaelectronicacr.com/app/api/auth/facebook/callback"
              : "http://localhost:3000/app/api/auth/facebook/callback",
          enableProof: true,
        },
        async function (_token, _tokenSecret, profile, done) {
          console.log("profile s", profile)
          console.log("_token", _token)
          console.log("_tokenSecret", _tokenSecret)
          const email2 = await fetch(
            "https://graph.facebook.com/v13.0/me?" +
              "fields=id,name,email,first_name,last_name&access_token=" +
              _token,
            { method: "POST" }
          )

          //const email2 = "https://graph.facebook.com/v3.2/me?" + "fields=id,name,email,first_name,last_name&access_token=" + token
          const email = (await email2.json()).email
          //const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Facebook OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.name.givenName,
              lastName: profile.name.familyName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "Linkedin",
          }
          done(undefined, { publicData })
        }
      ),
    },
  ],
})
