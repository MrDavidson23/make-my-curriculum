import { resolver } from "blitz"
import db from "db"
import { CreateCurriculum } from "../components/validations"

export default resolver.pipe(
  resolver.zod(CreateCurriculum),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {templateId,languageId, ...data} = input
    const curriculum = await db.curriculum.create({
      data: {
        ...data,
        user:{ connect: { id: ctx.session.userId } },
        template:{ connect: { id: templateId } },
        language:{ connect: { id: languageId } },
      }
    })
    return curriculum
  }
)
