import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetSkillOnCurriculum = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetSkillOnCurriculum),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const skillOnCurriculum = await db.skillOnCurriculum.findFirst({
      where: {
        id,
      },
    })
    if (!skillOnCurriculum) throw new NotFoundError()
    return skillOnCurriculum
  }
)
