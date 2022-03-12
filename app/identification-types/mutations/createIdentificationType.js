import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateIdentificationType = z.object({
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(CreateIdentificationType),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const identificationType = await db.identificationType.create({
      data: input,
    })
    return identificationType
  }
)
