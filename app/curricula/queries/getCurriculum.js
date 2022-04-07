import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetCurriculum = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetCurriculum),
  resolver.authorize(),
  async ({ id }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    let curriculum
    if (ctx.session.role === "ADMIN") {
      curriculum = await db.curriculum.findFirst({
        where: {
          id,
        },
      })
    } else {
      curriculum = await db.curriculum.findFirst({
        where: {
          id,
          userId: ctx.session.userId,
        },
      })
    }
    if (!curriculum) throw new NotFoundError()
    return curriculum
  }
)
