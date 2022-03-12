import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteTechnicalEducation = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteTechnicalEducation),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalEducation = await db.technicalEducation.deleteMany({
      where: {
        id,
      },
    })
    return technicalEducation
  }
)
