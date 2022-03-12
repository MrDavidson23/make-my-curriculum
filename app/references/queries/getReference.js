import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetReference = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetReference), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const reference = await db.reference.findFirst({
    where: {
      id,
    },
  })
  if (!reference) throw new NotFoundError()
  return reference
})
