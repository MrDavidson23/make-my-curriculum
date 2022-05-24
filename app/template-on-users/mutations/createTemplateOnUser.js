import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateTemplateOnUser = z.object({
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(CreateTemplateOnUser),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const templateOnUser = await db.templateOnUser.create({
      data: input,
    })
    return templateOnUser
  }
)
