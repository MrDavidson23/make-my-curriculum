import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteLaboralExperience = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteLaboralExperience),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const laboralExperience = await db.laboralExperience.deleteMany({
      where: {
        id,
      },
    })
    return laboralExperience
  }
)
