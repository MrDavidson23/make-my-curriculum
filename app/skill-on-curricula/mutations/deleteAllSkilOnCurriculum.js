import { resolver } from "blitz"
import db from "db"
export default resolver.pipe(resolver.authorize(), async ({ skillId }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const skillOnCurriculum = await db.skillOnCurriculum.deleteMany({
    where: {
      skillId,
    },
  })
  return skillOnCurriculum
})
