import { resolver } from "blitz"
import db from "db"
import { CreateSkill } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreateSkill),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { curriculumId, ...data } = input
    const skill = await db.skill.create({
      data: {
        ...data,
        user: { connect: { id: ctx.session.userId } },
      },
    })
    return skill
  }
)
