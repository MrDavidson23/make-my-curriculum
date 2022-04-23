import { resolver } from "blitz"
import db from "db"
import { CreateTechnicalEducation } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreateTechnicalEducation),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { curriculumId, ...data } = input
    const technicalEducation = await db.technicalEducation.create({
      data: {
        ...data,
        user: { connect: { id: ctx.session.userId } },
      },
    })
    return technicalEducation
  }
)
