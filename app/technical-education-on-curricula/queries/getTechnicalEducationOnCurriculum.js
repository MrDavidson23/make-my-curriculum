import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetTechnicalEducationOnCurriculum = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetTechnicalEducationOnCurriculum),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalEducationOnCurriculum = await db.technicalEducationOnCurriculum.findFirst({
      where: {
        id,
      },
    })
    if (!technicalEducationOnCurriculum) throw new NotFoundError()
    return technicalEducationOnCurriculum
  }
)
