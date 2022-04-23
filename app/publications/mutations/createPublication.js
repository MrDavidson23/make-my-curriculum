import { resolver } from "blitz"
import db from "db"
import { CreatePublication } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreatePublication),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { curriculumId, ...data } = input
    const publication = await db.publication.create({
      data: {
        ...data,
        user: { connect: { id: ctx.session.userId } },
      },
    })
    return publication
  }
)
