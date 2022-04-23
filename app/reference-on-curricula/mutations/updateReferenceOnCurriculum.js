import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { UpdateReference } from "../validations"
export default resolver.pipe(
  resolver.zod(UpdateReference),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const referenceOnCurriculum = await db.referenceOnCurriculum.update({
      where: {
        id,
      },
      data,
    })
    return referenceOnCurriculum
  }
)
