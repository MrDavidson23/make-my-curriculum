import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CreateLaboralExperience } from "../mutations/validations"
export default resolver.pipe(
  resolver.zod(CreateLaboralExperience),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const laboralExperienceOnCurriculum = await db.laboralExperienceOnCurriculum.create({
      data: input,
    })
    return laboralExperienceOnCurriculum
  }
)
