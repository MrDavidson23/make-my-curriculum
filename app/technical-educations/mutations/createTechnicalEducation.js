import { resolver } from "blitz"
import db from "db"
import { CreateTechnicalEducation } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreateTechnicalEducation),
  resolver.authorize(),
  async (input) => {
    const { curriculumId, ...data } = input
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalEducation = await db.technicalEducation.create({
      data: {
        ...data,
        curriculum: { connect: { id: curriculumId } },
      },
    })
    return technicalEducation
  }
)
