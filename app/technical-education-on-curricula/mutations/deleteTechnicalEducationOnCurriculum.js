import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { DeleteTechnicalEducation } from "../validations"
export default resolver.pipe(
  resolver.zod(DeleteTechnicalEducation),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalEducationOnCurriculum = await db.technicalEducationOnCurriculum.deleteMany({
      where: {
        id,
      },
    })
    return technicalEducationOnCurriculum
  }
)
