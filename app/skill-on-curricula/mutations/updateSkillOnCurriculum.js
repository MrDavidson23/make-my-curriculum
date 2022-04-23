import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { UpdateSkill } from "../mutations/validations"
export default resolver.pipe(
  resolver.zod(UpdateSkill),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const skillOnCurriculum = await db.skillOnCurriculum.update({
      where: {
        id,
      },
      data,
    })
    return skillOnCurriculum
  }
)
