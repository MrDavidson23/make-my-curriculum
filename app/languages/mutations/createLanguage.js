import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateLanguage = z.object({
  name: z.string(),
})
export default resolver.pipe(resolver.zod(CreateLanguage), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const language = await db.language.create({
    data: input,
  })
  return language
})
