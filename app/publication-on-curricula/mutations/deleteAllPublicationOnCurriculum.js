import { resolver } from "blitz"
import db from "db"
export default resolver.pipe(resolver.authorize(), async ({ publicationId }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const publicationOnCurriculum = await db.publicationOnCurriculum.deleteMany({
    where: {
      publicationId,
    },
  })
  return publicationOnCurriculum
})
