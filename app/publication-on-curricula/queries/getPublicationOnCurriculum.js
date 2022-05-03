import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
const GetPublicationOnCurriculum = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(
  resolver.zod(GetPublicationOnCurriculum),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const publicationOnCurriculum = await db.publicationOnCurriculum.findMany({
      where: {
        publicationId: id,
      },
    })
    if (!publicationOnCurriculum) throw new NotFoundError()
    return publicationOnCurriculum
  }
)
