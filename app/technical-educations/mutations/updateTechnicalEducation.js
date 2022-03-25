import { resolver } from "blitz"
import db from "db"
import { UpdateTechnicalEducation } from "../components/validations"

export default resolver.pipe(
  resolver.zod(UpdateTechnicalEducation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalEducation = await db.technicalEducation.update({
      where: {
        id,
      },
      data,
    })
    return technicalEducation
  }
)
