import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteIdentificationType = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteIdentificationType),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const identificationType = await db.identificationType.deleteMany({
      where: {
        id,
      },
    })
    return identificationType
  }
)
