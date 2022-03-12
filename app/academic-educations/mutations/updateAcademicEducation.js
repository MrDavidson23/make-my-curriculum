import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const UpdateAcademicEducation = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateAcademicEducation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const academicEducation = await db.academicEducation.update({
      where: {
        id,
      },
      data,
    })
    return academicEducation
  }
)
