import { resolver } from "blitz"
import db from "db"
export default resolver.pipe(resolver.authorize(), async ({ technicalEducationId }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const technicalEducationOnCurriculum = await db.technicalEducationOnCurriculum.deleteMany({
    where: {
      technicalEducationId,
    },
  })
  return technicalEducationOnCurriculum
})
