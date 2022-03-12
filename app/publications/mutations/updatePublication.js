import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdatePublication = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdatePublication),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const publication = await db.publication.update({
      where: {
        id,
      },
      data,
    })
    return publication
  }
)
