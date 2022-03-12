import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateUserProfile = z.object({
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(CreateUserProfile),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userProfile = await db.userProfile.create({
      data: input,
    })
    return userProfile
  }
)
