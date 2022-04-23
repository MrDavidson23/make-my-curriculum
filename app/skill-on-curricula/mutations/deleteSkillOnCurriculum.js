import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { DeleteSkill } from "../validations"
export default resolver.pipe(resolver.zod(DeleteSkill), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const skillOnCurriculum = await db.skillOnCurriculum.deleteMany({
    where: {
      id,
    },
  })
  return skillOnCurriculum
})
