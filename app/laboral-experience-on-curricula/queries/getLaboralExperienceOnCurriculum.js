import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetLaboralExperienceOnCurriculum = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetLaboralExperienceOnCurriculum),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const laboralExperienceOnCurriculum = await db.laboralExperienceOnCurriculum.findMany({
      where: {
        laboralExperienceId: id,
      },
    })
    if (!laboralExperienceOnCurriculum) throw new NotFoundError()
    return laboralExperienceOnCurriculum
  }
)
