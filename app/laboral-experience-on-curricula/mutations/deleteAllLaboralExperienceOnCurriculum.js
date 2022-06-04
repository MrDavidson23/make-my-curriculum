import { resolver } from "blitz"
import db from "db"
export default resolver.pipe(resolver.authorize(), async ({ laboralExperienceId }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const laboralExperienceOnCurriculum = await db.laboralExperienceOnCurriculum.deleteMany({
    where: {
      laboralExperienceId,
    },
  })
  return laboralExperienceOnCurriculum
})
