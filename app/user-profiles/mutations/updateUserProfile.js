import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateUserProfile = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateUserProfile),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userProfile = await db.userProfile.update({
      where: {
        id,
      },
      data,
    })
    return userProfile
  }
)
