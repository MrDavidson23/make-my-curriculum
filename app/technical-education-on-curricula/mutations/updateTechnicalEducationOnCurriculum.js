import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { UpdateTechnicalEducation } from "../mutations/validations"
export default resolver.pipe(
  resolver.zod(UpdateTechnicalEducation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalEducationOnCurriculum = await db.technicalEducationOnCurriculum.update({
      where: {
        id,
      },
      data,
    })
    return technicalEducationOnCurriculum
  }
)
