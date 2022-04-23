import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { UpdatePublication } from "../validations"
export default resolver.pipe(
  resolver.zod(UpdatePublication),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const publicationOnCurriculum = await db.publicationOnCurriculum.update({
      where: {
        id,
      },
      data,
    })
    return publicationOnCurriculum
  }
)
