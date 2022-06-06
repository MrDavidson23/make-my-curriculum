import { resolver } from "blitz"
import db from "db"
export default resolver.pipe(resolver.authorize(), async ({ referenceId }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const referenceOnCurriculum = await db.referenceOnCurriculum.deleteMany({
    where: {
      referenceId,
    },
  })
  return referenceOnCurriculum
})
