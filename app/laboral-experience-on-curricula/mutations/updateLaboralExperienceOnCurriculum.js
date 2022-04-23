import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { UpdateLaboralExperience } from "../validations"
export default resolver.pipe(
  resolver.zod(UpdateLaboralExperience),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const laboralExperienceOnCurriculum = await db.laboralExperienceOnCurriculum.update({
      where: {
        id,
      },
      data,
    })
    return laboralExperienceOnCurriculum
  }
)
