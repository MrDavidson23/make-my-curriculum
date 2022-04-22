import { resolver } from "blitz"
import db from "db"
import { CreateSkill } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreateSkill),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const skill = await db.skill.create({
      data: {
        ...input,
        userId: ctx.session.userId,
      },
    })
    return skill
  }
)
