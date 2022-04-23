import { resolver } from "blitz"
import db from "db"
import { CreateLaboralExperience } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreateLaboralExperience),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { curriculumId, ...data } = input
    const laboralExperience = await db.laboralExperience.create({
      data: {
        ...data,
        user: { connect: { id: ctx.session.userId } },
      },
    })
    return laboralExperience
  }
)
