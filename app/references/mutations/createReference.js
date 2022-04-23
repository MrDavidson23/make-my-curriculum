import { resolver } from "blitz"
import db from "db"
import { CreateReferenceValidation } from "../components/validaciones"

export default resolver.pipe(
  resolver.zod(CreateReferenceValidation),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { curriculumId, ...data } = input
    const reference = await db.reference.create({
      data: {
        ...data,
        user: { connect: { id: ctx.session.userId } },
      },
    })
    return reference
  }
)
