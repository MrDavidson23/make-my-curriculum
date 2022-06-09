import { resolver } from "blitz"
import db from "db"
export default resolver.pipe(resolver.authorize(), async ({ academicEducationId }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const academicEducationOnCurriculum = await db.academicEducationOnCurriculum.deleteMany({
    where: {
      academicEducationId,
    },
  })
  return academicEducationOnCurriculum
})
