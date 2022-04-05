import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetCurriculum = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetCurriculum), resolver.authorize(), async ({ id },ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  
  const curriculum = await db.curriculum.findFirst({
    where: {
      id,
      userId:ctx.session.userId,
    },
  })

  if (!curriculum) throw new NotFoundError()

  const filter = {where: {curriculumId:id}}
  curriculum["skills"] = await db.skill.findMany(filter)
  curriculum["laboralExperiences"] = await db.laboralExperience.findMany(filter)
  curriculum["academicEducations"] = await db.academicEducation.findMany(filter)
  curriculum["technicalEducations"] = await db.technicalEducation.findMany(filter)
  curriculum["publications"] = await db.publication.findMany(filter)
  curriculum["references"] = await db.reference.findMany(filter)

  return curriculum
})
