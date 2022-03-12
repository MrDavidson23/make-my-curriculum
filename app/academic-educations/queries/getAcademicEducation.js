import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetAcademicEducation = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetAcademicEducation),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const academicEducation = await db.academicEducation.findFirst({
      where: {
        id,
      },
    })
    if (!academicEducation) throw new NotFoundError()
    return academicEducation
  }
)
