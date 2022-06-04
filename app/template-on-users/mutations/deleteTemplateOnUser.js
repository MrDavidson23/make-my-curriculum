import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteTemplateOnUser = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteTemplateOnUser),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const templateOnUser = await db.templateOnUser.deleteMany({
      where: {
        id,
      },
    })
    return templateOnUser
  }
)
