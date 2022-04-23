import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetReferenceOnCurriculum = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetReferenceOnCurriculum),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const referenceOnCurriculum = await db.referenceOnCurriculum.findFirst({
      where: {
        id,
      },
    })
    if (!referenceOnCurriculum) throw new NotFoundError()
    return referenceOnCurriculum
  }
)
