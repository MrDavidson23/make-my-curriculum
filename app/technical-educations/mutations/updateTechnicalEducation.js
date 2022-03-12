import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateTechnicalEducation = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateTechnicalEducation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalEducation = await db.technicalEducation.update({
      where: {
        id,
      },
      data,
    })
    return technicalEducation
  }
)
