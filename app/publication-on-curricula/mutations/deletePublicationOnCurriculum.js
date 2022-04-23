import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { DeletePublication } from "../validations"
export default resolver.pipe(
  resolver.zod(DeletePublication),
  resolver.authorize(),
  async ({ curriculumId, publicationId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const publicationOnCurriculum = await db.publicationOnCurriculum.deleteMany({
      where: {
        curriculumId,
        publicationId,
      },
    })
    return publicationOnCurriculum
  }
)
