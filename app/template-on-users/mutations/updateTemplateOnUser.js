import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateTemplateOnUser = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateTemplateOnUser),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const templateOnUser = await db.templateOnUser.update({
      where: {
        id,
      },
      data,
    })
    return templateOnUser
  }
)
