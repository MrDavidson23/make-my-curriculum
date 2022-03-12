import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreatePublication = z.object({
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(CreatePublication),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const publication = await db.publication.create({
      data: input,
    })
    return publication
  }
)
