import { resolver } from "blitz"
import db from "db"
import { UpdateReferenceValidation } from "../components/validaciones"

export default resolver.pipe(
  resolver.zod(UpdateReferenceValidation),
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
