import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateReference = z.object({
  name: z.string(),
})
export default resolver.pipe(resolver.zod(CreateReference), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const reference = await db.reference.create({
    data: input,
  })
  return reference
})
