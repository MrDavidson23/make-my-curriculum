import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetAcademicEducationOnCurriculum = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetAcademicEducationOnCurriculum),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const academicEducationOnCurriculum = await db.academicEducationOnCurriculum.findFirst({
      where: {
        id,
      },
    })
    if (!academicEducationOnCurriculum) throw new NotFoundError()
    return academicEducationOnCurriculum
  }
)
