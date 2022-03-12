import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateIdentificationType = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateIdentificationType),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const identificationType = await db.identificationType.update({
      where: {
        id,
      },
      data,
    })
    return identificationType
  }
)
