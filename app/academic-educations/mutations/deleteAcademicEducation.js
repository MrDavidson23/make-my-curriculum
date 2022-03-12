import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const DeleteAcademicEducation = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteAcademicEducation),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const academicEducation = await db.academicEducation.deleteMany({
      where: {
        id,
      },
    })
    return academicEducation
  }
)
