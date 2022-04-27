// app.js
const blitz = require("blitz/custom-server")
const { createServer } = require("http")
const { parse } = require("url")
const { log } = require("next/dist/server/lib/logging")

const { PORT = "3000" } = process.env
const dev = process.env.NODE_ENV !== "production"
const app = blitz({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    handle(req, res, parsedUrl)
    console.log("pathname", pathname)
  }).listen(PORT, () => {
    log.success(`Ready on http://localhost:${PORT}`)
  })
})
