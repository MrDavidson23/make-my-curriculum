import { resolver } from "blitz"
import db from "db"
import { CreateAcademicEducation } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreateAcademicEducation),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { curriculumId, ...data } = input
    const academicEducation = await db.academicEducation.create({
      data: {
        ...data,
        user: { connect: { id: ctx.session.userId } },
      },
    })
    return academicEducation
  }
)
