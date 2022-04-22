import { resolver } from "blitz"
import db from "db"
import { CreateReferenceValidation } from "../components/validaciones"

export default resolver.pipe(
  resolver.zod(CreateReferenceValidation),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const reference = await db.reference.create({
      data: {
        ...input,
        userId: ctx.session.userId,
      },
    })
    return reference
  }
)
