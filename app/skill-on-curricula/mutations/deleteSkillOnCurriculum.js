import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { DeleteSkill } from "../validations"
export default resolver.pipe(
  resolver.zod(DeleteSkill),
  resolver.authorize(),
  async ({ curriculumId, skillId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const skillOnCurriculum = await db.skillOnCurriculum.deleteMany({
      where: {
        curriculumId,
        skillId,
      },
    })
    return skillOnCurriculum
  }
)
