import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CreatePublication } from "../mutations/validations"
export default resolver.pipe(
  resolver.zod(CreatePublication),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const publicationOnCurriculum = await db.publicationOnCurriculum.create({
      data: input,
    })
    return publicationOnCurriculum
  }
)
