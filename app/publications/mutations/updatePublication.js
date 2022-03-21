import { resolver } from "blitz"
import db from "db"
import { UpdatePublication } from "../components/validations"

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
