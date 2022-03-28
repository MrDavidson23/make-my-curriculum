import { resolver } from "blitz"
import db from "db"
import { DeleteLanguage } from "../components/validations"
export default resolver.pipe(resolver.zod(DeleteLanguage), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const language = await db.language.deleteMany({
    where: {
      id,
    },
  })
  return language
})
