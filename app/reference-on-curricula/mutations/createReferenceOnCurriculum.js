import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { CreateReference } from "../validations"
export default resolver.pipe(resolver.zod(CreateReference), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const referenceOnCurriculum = await db.referenceOnCurriculum.create({
    data: input,
  })
  return referenceOnCurriculum
})
