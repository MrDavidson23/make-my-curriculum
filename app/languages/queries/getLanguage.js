import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetLanguage = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetLanguage), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const language = await db.language.findFirst({
    where: {
      id,
    },
  })
  if (!language) throw new NotFoundError()
  return language
})
