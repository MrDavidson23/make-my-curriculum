import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteUserProfile = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteUserProfile),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userProfile = await db.userProfile.deleteMany({
      where: {
        id,
      },
    })
    return userProfile
  }
)
