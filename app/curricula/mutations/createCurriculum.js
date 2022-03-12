import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateCurriculum = z.object({
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(CreateCurriculum),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const curriculum = await db.curriculum.create({
      data: input,
    })
    return curriculum
  }
)
