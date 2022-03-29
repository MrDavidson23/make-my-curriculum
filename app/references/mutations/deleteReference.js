import { resolver } from "blitz"
import db from "db"
import { DeleteReference } from "../components/validaciones"
export default resolver.pipe(
  resolver.zod(DeleteReference),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const reference = await db.reference.deleteMany({
      where: {
        id,
      },
    })
    return reference
  }
)
