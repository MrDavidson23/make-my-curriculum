import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CreateTechnicalEducation } from "../mutations/validations"
export default resolver.pipe(
  resolver.zod(CreateTechnicalEducation),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalEducationOnCurriculum = await db.technicalEducationOnCurriculum.create({
      data: input,
    })
    return technicalEducationOnCurriculum
  }
)
