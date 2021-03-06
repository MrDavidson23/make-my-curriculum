import { sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
const config = {
  basePath: "/app",
  middleware: [
    sessionMiddleware({
      cookiePrefix: "makeMyCurriculum",
      isAuthorized: simpleRolesIsAuthorized,
      secureCookies: false, //necesario hasta que haya ssl en el proyecto
    }),
  ],

  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ]
  },
  compress: true,
}
module.exports = config
