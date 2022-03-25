import { resolver } from "blitz"
import db from "db"
import { UpdateSkill } from "../components/validations"

export default resolver.pipe(
  resolver.zod(UpdateSkill),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const skill = await db.skill.update({
      where: {
        id,
      },
      data,
    })
    return skill
  }
)
