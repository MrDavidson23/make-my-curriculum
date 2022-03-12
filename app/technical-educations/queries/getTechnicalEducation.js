import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetTechnicalEducation = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetTechnicalEducation),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalEducation = await db.technicalEducation.findFirst({
      where: {
        id,
      },
    })
    if (!technicalEducation) throw new NotFoundError()
    return technicalEducation
  }
)
