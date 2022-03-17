import { UpdateReference } from "app/pages/references/validaciones"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
  resolver.zod(UpdateReference),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const reference = await db.reference.update({
      where: {
        id,
      },
      data,
    })
    return reference
  }
)
