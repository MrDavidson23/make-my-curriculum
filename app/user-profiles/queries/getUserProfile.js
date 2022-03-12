import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetUserProfile = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetUserProfile), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const userProfile = await db.userProfile.findFirst({
    where: {
      id,
    },
  })
  if (!userProfile) throw new NotFoundError()
  return userProfile
})
