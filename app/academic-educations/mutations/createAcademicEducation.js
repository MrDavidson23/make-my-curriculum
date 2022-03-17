import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
const CreateAcademicEducation = z.object({
  id: z.number(),
  studies: z.string(),
  location: z.string(),
  startYear: z.date(),
  finishYear: z.date(),
  institution: z.string(),
})
export default resolver.pipe(
  resolver.zod(CreateAcademicEducation),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const academicEducation = await db.academicEducation.create({
      data: input,
    })
    return academicEducation
  }
)
