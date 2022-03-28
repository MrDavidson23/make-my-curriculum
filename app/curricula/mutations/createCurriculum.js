import { resolver } from "blitz"
import db from "db"
import { CreateCurriculum } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreateCurriculum),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const curriculum = await db.curriculum.create({
      /*data: {
        ...input,
        UserId: ctx.session.userId,
      }*/
      data: input
    })
    return curriculum
  }
)
