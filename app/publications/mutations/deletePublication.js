import { resolver } from "blitz"
import db from "db"
import { DeletePublication } from "../components/validations"

export default resolver.pipe(
  resolver.zod(DeletePublication),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const publication = await db.publication.deleteMany({
      where: {
        id,
      },
    })
    return publication
  }
)
