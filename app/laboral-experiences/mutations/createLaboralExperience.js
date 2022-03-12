import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateLaboralExperience = z.object({
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(CreateLaboralExperience),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const laboralExperience = await db.laboralExperience.create({
      data: input,
    })
    return laboralExperience
  }
)
