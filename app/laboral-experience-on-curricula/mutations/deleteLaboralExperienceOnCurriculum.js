import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { DeleteLaboralExperience } from "../validations"
export default resolver.pipe(
  resolver.zod(DeleteLaboralExperience),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const laboralExperienceOnCurriculum = await db.laboralExperienceOnCurriculum.deleteMany({
      where: {
        id,
      },
    })
    return laboralExperienceOnCurriculum
  }
)
