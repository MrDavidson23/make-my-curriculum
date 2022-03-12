import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateTechnicalEducation = z.object({
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(CreateTechnicalEducation),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technicalEducation = await db.technicalEducation.create({
      data: input,
    })
    return technicalEducation
  }
)
