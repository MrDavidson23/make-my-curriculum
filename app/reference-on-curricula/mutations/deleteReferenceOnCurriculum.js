import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { DeleteReference } from "../validations"
export default resolver.pipe(
  resolver.zod(DeleteReference),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const referenceOnCurriculum = await db.referenceOnCurriculum.deleteMany({
      where: {
        id,
      },
    })
    return referenceOnCurriculum
  }
)
